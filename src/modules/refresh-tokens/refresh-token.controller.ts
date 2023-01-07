import { myDataSource } from '../../common/config/app-data-source';
import { User } from '../../models/user.entity';
import { RefreshToken } from '../../models/refresh-token.entity';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { TokensInterface } from '../../common/interfaces/tokens.interface';
import { MoreThan } from 'typeorm';
import { getById } from '../users/users.controller';
dotenv.config();

export async function generateTokens(user: User, role: string): Promise<{token: string, refresh: string}> {
    try {
        const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role,
        };
    
        const secret = process.env.ENCRYPTION_CHARS;
        
        if(secret) {
            const token = jwt.sign({user: data}, secret, { expiresIn: '1h' });
            const refresh = generateRandomCodeByLength(400);
            const expire = new Date();
            expire.setMonth(expire.getMonth() + 1);
            const refreshTokenRepository = myDataSource.getRepository(RefreshToken);
            await refreshTokenRepository.save({ token, refresh, role, expire, idUser: user.id });
            return { token, refresh };
        } else {
            return { token: '', refresh: ''};
        }
      } catch (error) {
        return { token: '', refresh: ''};
      }
}

export async function refreshToken(
    idUser: number,
    token: string,
    refresh: string,
  ): Promise<{ user: User; tokens: TokensInterface }> {
    const refreshTokenRepository = myDataSource.getRepository(RefreshToken);
    const refreshToken = await refreshTokenRepository
      .findOneOrFail({
        where: {
          idUser,
          token,
          refresh,
          expire: MoreThan(new Date()),
        }
      });
    const role = refreshToken.role;
    await refreshTokenRepository.remove(refreshToken);
    const user = await getById(refreshToken.idUser);
    if(!user) {
      throw new Error('Error');
    }
    delete user.password;
    return {
      user,
      tokens: await generateTokens(user, role),
    };
}

function generateRandomCodeByLength(
    length: number,
    options?: string,
): string {
    let result = '';

    const characters =
      options && options.trim() !== '' ? options : process.env.ENCRYPTION_CHARS;

    if(characters) {
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
        }
    }

    return result;
}

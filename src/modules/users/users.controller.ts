import { myDataSource } from '../../common/config/app-data-source';
import { User } from '../../models/user.entity';
import { Not } from 'typeorm';
import { StatusEnum } from '../../common/enum/status.enum';

export async function generateUsername(
    firstName: string,
    lastName: string,
    counter: number = 0
) {
    const userRepository = myDataSource.getRepository(User);

    let username: string =
        firstName.toLowerCase() + '-' + lastName.toLowerCase() + counter;

    let userExists = await userRepository.findOne({
        where: {
            username
        }
    });

    while (userExists) {
        username =
            firstName.toLowerCase() + '-' + lastName.toLowerCase() + ++counter;
        userExists = await userRepository.findOne({
            where: {
                username
            }
        });
    }

    return username;
}

export async function getById(id: number): Promise<User | undefined> {
    const userRepository = myDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
        where: {
            id,
            status: Not(StatusEnum.deleted)
        }
    });
    return user;
}

export async function getByEmail(email: string): Promise<User> {
    const userRepository = myDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
        where: {
            email,
            status: Not(StatusEnum.deleted)
        },
        relations: ['file']
    });
    
    return user;
}

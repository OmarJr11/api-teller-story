import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { User } from './user.entity';

@Entity('refresh_tokens', { schema: 'system' })
export class RefreshToken {
    @Column('int8', { name: 'user', primary: true})
    idUser: number;

    @ManyToOne(() => User, (user) => user.refreshTokens)
    @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
    user?: User;
  
    @Column('character varying', { name: 'token', length: 400, primary: true })
    token: string;

    @Column('character varying', { name: 'refresh', length: 400 })
    refresh: string;
  
    @Column('character varying', { name: 'role', length: 50 })
    role: string;
  
    @Column('timestamp without time zone', { name: 'expire' })
    expire: Date;

    @Column('timestamp without time zone', {
        name: 'creation_date',
        select: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationDate?: Date | string;
}

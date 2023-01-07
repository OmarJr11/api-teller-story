import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany
    //OneToMany
} from 'typeorm';
import { File } from './file.entity';
import { RefreshToken } from './refresh-token.entity';
//import { Comment } from './comment.entity';

@Entity('users', { schema: 'system' })
export class User {
    @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
    id: number;

    @Column('character varying', { name: 'username', length: 100 })
    username: string;

    @Column('character varying', { name: 'first_name', length: 50 })
    firstName: string;

    @Column('character varying', { name: 'last_name', length: 50 })
    lastName: string;

    @Column('int8', { name: 'image', nullable: true })
    image?: number;

    @OneToOne(() => File, (file) => file.id)
    @JoinColumn([{ name: 'image', referencedColumnName: 'id' }])
    file?: File;

    @Column('character varying', { name: 'password', length: 100 })
    password?: string;

    @Column('character varying', { name: 'email', length: 100 })
    email: string;

    @Column('character varying', { name: 'status', length: 50 })
    status: string;

    //@OneToMany(() => Comment, (comment) => comment.creator)
    //comments: Comment[];

    @CreateDateColumn({ name: 'creation_date' })
    creationDate: Date;

    /**
     *  Refresh token relations
     */
    @OneToMany(() => RefreshToken, (refreshTokens) => refreshTokens.user)
    refreshTokens: RefreshToken[];
}

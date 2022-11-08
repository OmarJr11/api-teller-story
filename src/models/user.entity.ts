import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Comment } from './comment.entity';

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

  @Column('character varying', { name: 'password', length: 100 })
  password: string;

  @Column('character varying', { name: 'email', length: 100 })
  email: string;

  @Column('character varying', { name: 'status', length: 50 })
  status: string;

  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;
}

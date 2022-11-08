import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('comments', { schema: 'public' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  id: number;

  @Column('text', { name: 'id_story' })
  idStory: number;

  @ManyToOne(() => User, (user) => user.comments)
  creator: User;

  @Column('text', { name: 'text' })
  text: string;

  @Column('int8', { name: 'modifier', nullable: true, select: false })
  modifier: number;

  @CreateDateColumn({ name: 'cration_date' })
  creationDate: Date;

  @UpdateDateColumn({ name: 'modification_date' })
  modificationDate: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments', { schema: 'public' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  id: number;

  @Column('text', { name: 'id_story' })
  idStory: number;

  //@Column('text', { name: 'id_comment' })
  //idStory: number;

  @Column('int8', { name: 'like', default: 0 })
  like: number;

  @Column('text', { name: 'text' })
  text: string;

  @Column('character varying', { name: 'status', length: 50 })
  status: string;

  @Column('int8', { name: 'creator', nullable: true, select: false })
  creator?: number;

  @Column('int8', { name: 'modifier', nullable: true, select: false })
  modifier?: number;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate?: Date | string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'modification_date',
    nullable: true,
    select: false,
  })
  modificationDate?: Date;
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from './file.entity';

@Entity('stories', { schema: 'public' })
export class Story {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  id?: number;

  @Column('character varying', { name: 'title', length: 150 })
  title: string;

  @Column('text', { name: 'text' })
  text: string;

  @Column('int8', { name: 'like', default: () => '0' })
  like?: number;

  @Column('int8', { name: 'image'})
  image: number;

  @OneToOne(() => File, (file) => file.id)
  @JoinColumn([{ name: 'image', referencedColumnName: 'id' }])
  file: File;

  @Column('character varying', { name: 'status', length: 50 })
  status: string;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate?: Date | string;

  @Column('int8', { name: 'creator', nullable: true, select: false })
  creator?: number;

  @Column('int8', { name: 'modifier', nullable: true, select: false })
  modifier?: number;

  @Column('character varying', {
    name: 'modifier_ip',
    length: 50,
    nullable: true,
    select: false,
  })
  modifierIp?: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'modification_date',
    nullable: true,
    select: false,
  })
  modificationDate?: Date;
}

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn  } from 'typeorm';
  
  @Entity('files', { schema: 'system' })
  export class File {
    @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
    id: number;
  
    @Column('character varying', { name: 'filename', length: 500 })
    filename: string;
  
    @Column('character varying', { name: 'url', length: 500 })
    url: string;
  
    @Column('character varying', { name: 'extension', length: 20 })
    extension: string;

    @Column('int8', { name: 'creator', nullable: true, select: false })
    creator?: number;
  
    @CreateDateColumn({ name: 'creation_date' })
    creationDate: Date;
  }
  
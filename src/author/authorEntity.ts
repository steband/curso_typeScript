import {  Column, 
          Entity, 
          PrimaryGeneratedColumn, 
          UpdateDateColumn, 
          CreateDateColumn, 
          DeleteDateColumn, } from "typeorm";

@Entity({name: 'author'})
export class AuthorEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_Author' })
    idAuthor: string

//    @Column({name: 'id_author', length: 100, nullable: false })
    @Column({name: 'name', length: 100, nullable: false })
    name: string;
    @Column({name: 'email', length: 70, nullable: false })
    email: string;
    @Column({name: 'bio', length: 500, nullable: false })
    bio: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;  }
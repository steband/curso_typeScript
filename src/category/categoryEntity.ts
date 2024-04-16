import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'category'})
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_category' })
    idCategory: string;
    @Column({name:'name', length: '50', nullable: false})
    name: string;
    @Column({name:'slug_name', length: '50', nullable: false})
    slugName: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;    
}

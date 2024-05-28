import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class RecuperarSenha {
    @PrimaryGeneratedColumn('uuid', {primaryKeyConstraintName: 'pk_recuperar_senha'})
    id: string;
    
    @Column({ nullable: false })
    email: string;

    @CreateDateColumn()
    dataCriacao: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Asset } from "./asset.entity";

@Entity()
export class Upload {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    hashedName: string

    @Column()
    fileName: string;

    @ManyToOne(type => Asset)
    asset: Asset
}
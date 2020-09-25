import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { AssetType } from "../asset-types.enum";
import { Briefing } from "./briefing.entity";
import { Upload } from "./upload.entity";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    type: AssetType

    @Column()
    scene: number;

    @Column()
    variant: number;

    @Column()
    camera: number;

    @Column()
    sort_order: number;

    @ManyToOne(type => Briefing)
    briefing: Briefing

    @OneToMany(type => Upload, upload => upload.asset, { cascade: true, eager: true })
    uploads: Upload[]
}
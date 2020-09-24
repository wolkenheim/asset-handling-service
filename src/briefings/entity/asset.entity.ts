import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { AssetType } from "../asset-types.enum";
import { Briefing } from "./briefing.entity";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn()
    id: number;

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
}
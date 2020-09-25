import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Asset } from "./asset.entity";

@Entity()
export class Briefing {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    jira_ticket_title: string;

    @OneToMany(type => Asset, asset => asset.briefing, { cascade: true, eager: true })
    assets: Asset[]
}
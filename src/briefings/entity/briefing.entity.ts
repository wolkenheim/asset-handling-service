import { Entity, Column, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn, AfterLoad } from "typeorm";
import { Asset } from "./asset.entity";
import { Type } from 'class-transformer';

@Entity()
export class Briefing {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    content_piece_id: string

    @Column()
    briefing_type: string

    @Column()
    team: string

    @Column({ type: "text", default: null, nullable: true })
    description: string

    @Column()
    jira_ticket_title: string;

    @Type(() => Date)
    @Column("timestamptz")
    deadline: Date

    @Type(() => Date)
    @Column("timestamptz")
    briefing_date: Date

    @Column({ default: 1 })
    kw: number

    @Column({ type: "jsonb", default: null, nullable: true })
    camera: string

    @Column({ default: 1 })
    scene: number

    @OneToMany(type => Asset, asset => asset.briefing, { cascade: ["remove", "insert", "update"], eager: true })
    assets: Asset[]

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;


    @AfterLoad()
    orderAssets() {

        if (!this.assets || this.assets.length < 2) {
            return;
        }

        this.assets.sort((a, b) => {
            return new Date(a.createdDate).getTime() > new Date(b.createdDate).getTime() ? 1 : -1;
        });
    }
}
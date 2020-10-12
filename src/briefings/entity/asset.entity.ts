import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn, AfterLoad, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AssetType } from "./asset-type.enum";
import { AssetExtension } from "./asset-extension.enum";
import { Briefing } from "./briefing.entity";
import { Upload } from "./upload.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    type: AssetType

    @Column({ default: AssetExtension.JPG })
    extension: AssetExtension

    @Column()
    scene: number;

    @Column()
    variant: number;

    @Column()
    camera: number;

    @Column({ default: 1 })
    sort_order: number;

    @Column({ default: 1 })
    upload_counter: number

    @Column({ default: null, nullable: true })
    dam_asset_id: string

    @ManyToOne(type => Briefing)
    briefing: Briefing

    @OneToMany(type => Upload, upload => upload.asset, { cascade: true, eager: true })
    uploads: Upload[]

    @Column({ default: null, nullable: true })
    file_name: string

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    protected file_path: string

    setFilePath(filePath: string) {
        this.file_path = filePath;
    }

    @AfterLoad()
    initFilePath() {
        this.setFilePath(this.file_name + "." + this.extension);
    }
}
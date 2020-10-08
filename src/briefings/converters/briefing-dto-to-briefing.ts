import { Injectable } from "@nestjs/common";
import { AssetType } from "../entity/asset-type.enum";
import { BriefingCreateDTO } from "../dto/briefing-create.dto";
import { Asset } from "../entity/asset.entity";
import { Briefing } from "../entity/briefing.entity";
import { Converter } from "./converter.interface";
import { AssetCreateDTO } from "../dto/asset-create.dto";
import { AssetDTOToAssetConverter } from "./asset-dto-to-asset";
import { AssetExtension } from "../entity/asset-extension.enum";

@Injectable()
export class BriefingDTOToBriefingConverter implements Converter<BriefingCreateDTO, Briefing>{

    constructor(private readonly assetDTOToAssetConverter: AssetDTOToAssetConverter) { }

    public convert(briefingCreateDTO: BriefingCreateDTO): Briefing {
        const briefing = new Briefing;

        briefing.id = briefingCreateDTO.id;
        briefing.content_piece_id = briefingCreateDTO.content_piece_id;
        briefing.briefing_type = briefingCreateDTO.briefing_type;
        briefing.team = briefingCreateDTO.team;
        briefing.description = briefingCreateDTO.description;
        briefing.jira_ticket_title = briefingCreateDTO.jira_ticket_title;
        briefing.deadline = new Date(briefingCreateDTO.deadline);
        briefing.briefing_date = new Date(briefingCreateDTO.briefing_date);
        briefing.kw = briefingCreateDTO.kw;
        briefing.camera = briefingCreateDTO.camera;
        briefing.scene = briefingCreateDTO.scene;

        briefing.assets = [];
        const assetOne = this.createFirstAssetForBriefing(briefing);
        briefing.assets.push(assetOne);

        return briefing;
    }

    public createFirstAssetForBriefing(briefing: Briefing): Asset {

        const assetCreateDTO = new AssetCreateDTO();

        assetCreateDTO.variant = 1;
        assetCreateDTO.camera = 1;
        assetCreateDTO.type = AssetType.CONTENT_IMAGE;
        assetCreateDTO.extension = AssetExtension.JPG;

        const asset = this.assetDTOToAssetConverter.convertWithAdditionalAttributes(briefing, assetCreateDTO);

        return asset;
    }

}
import { Injectable } from "@nestjs/common";
import { AssetType } from "../entity/asset-type.enum";
import { CreateBriefingDTO } from "../dto/create-briefing.dto";
import { Asset } from "../entity/asset.entity";
import { Briefing } from "../entity/briefing.entity";
import { Converter } from "./converter.interface";

@Injectable()
export class BriefingDTOToBriefingConverter implements Converter<CreateBriefingDTO, Briefing>{
    public convert(createBriefingDTO: CreateBriefingDTO): Briefing {
        const briefing = new Briefing;

        briefing.id = createBriefingDTO.id;
        briefing.content_piece_id = createBriefingDTO.content_piece_id;
        briefing.briefing_type = createBriefingDTO.briefing_type;
        briefing.team = createBriefingDTO.team;
        briefing.description = createBriefingDTO.description;
        briefing.jira_ticket_title = createBriefingDTO.jira_ticket_title;
        briefing.deadline = new Date(createBriefingDTO.deadline);
        briefing.briefing_date = new Date(createBriefingDTO.briefing_date);
        briefing.kw = createBriefingDTO.kw;
        briefing.camera = createBriefingDTO.camera;
        briefing.scene = createBriefingDTO.scene;

        briefing.assets = [];
        const assetOne = this.createFirstAssetForBriefing(briefing);
        briefing.assets.push(assetOne);

        return briefing;
    }

    public createFirstAssetForBriefing(briefing: Briefing): Asset {

        const asset = new Asset();

        asset.type = AssetType.CONTENT_IMAGE;
        asset.scene = 1;
        asset.camera = 1;
        asset.variant = 1;
        asset.sort_order = 1;

        return asset;
    }

}
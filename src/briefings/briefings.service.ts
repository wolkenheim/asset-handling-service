import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AssetType } from './asset-types.enum';
import { BriefingRepository } from './briefing.repository';
import { AssetDTOToAsset } from './converters/asset-dto-to-asset';
import { BriefingDTOToBriefingConverter } from './converters/briefing-dto-to-briefing';
import { CreateAssetDTO } from './dto/create-asset-dto';
import { CreateBriefingDTO } from './dto/create-briefing-dto';
import { Asset } from './entity/asset.entity';
import { Briefing } from './entity/briefing.entity';
import { UniqueContraintException } from './exceptions/unique-contraint.exception';

@Injectable()
export class BriefingsService {

    constructor(
        private readonly briefingRepository: BriefingRepository,
        private readonly briefingDTOToBriefingConverter: BriefingDTOToBriefingConverter,
        private readonly assetDTOToAsset: AssetDTOToAsset
    ) { }

    async getAllBriefings(): Promise<Briefing[]> {
        return this.briefingRepository.getBriefings();
    }

    async getBriefingById(id: string): Promise<Briefing> {
        const foundBriefing = this.briefingRepository.findOne(id, { relations: ["assets"] });

        if (!foundBriefing) {
            throw new NotFoundException();
        }

        return foundBriefing;
    }

    async createBriefing(createBriefingDTO: CreateBriefingDTO): Promise<Briefing> {

        const foundBriefing = await this.briefingRepository.findOne(createBriefingDTO.id, { relations: ["assets"] });

        if (foundBriefing) {
            throw new UniqueContraintException('Briefing UUID already exists', HttpStatus.BAD_REQUEST);
        }

        const briefing = this.briefingDTOToBriefingConverter.convert(createBriefingDTO);

        return this.briefingRepository.createBriefingWithAssets(briefing);
    }

    async addAssetToBriefing(briefingId: string, createAssetDTO: CreateAssetDTO) {
        const briefing = await this.getBriefingById(briefingId);

        this.validateAsset(briefing, createAssetDTO);

        const asset: Asset = this.assetDTOToAsset.convert(createAssetDTO);
        const sortOrder = this.assetDTOToAsset.getNextSortOrderIndex(briefing.assets);
        asset.sort_order = sortOrder

        briefing.assets.push(asset);

        this.briefingRepository.save(briefing);

    }

    protected validateAsset(briefing: Briefing, createAssetDTO: CreateAssetDTO): void {
        // validate uniqueness of attributes
        const match = briefing.assets.find((asset: Asset) => {
            if (createAssetDTO.scene === asset.scene &&
                createAssetDTO.variant === asset.variant &&
                createAssetDTO.camera === asset.camera) {
                return asset;
            }
        })

        if (match) {
            throw new UniqueContraintException('Combination of Scene, Variant and Camera must be unique', HttpStatus.BAD_REQUEST);
        }
    }



}

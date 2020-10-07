import { HttpStatus, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { AssetDTOToAssetConverter } from "../converters/asset-dto-to-asset";
import { AssetCreateDTO } from "../dto/asset-create.dto";
import { AssetUpdateDTO } from "../dto/asset-update.dto";
import { Asset } from "../entity/asset.entity";
import { Briefing } from "../entity/briefing.entity";
import { UniqueContraintException } from "../exceptions/unique-contraint.exception";
import { AssetRepository } from "../repositories/asset.repository";
import { BriefingsService } from "./briefings.service";

@Injectable()
export class AssetsService {

    constructor(
        private readonly assetRepository: AssetRepository,
        private readonly assetDTOToAssetConverter: AssetDTOToAssetConverter,
        private readonly briefingsService: BriefingsService,
    ) { }


    async updateAsset(id: string, assetUpdateDTO: AssetUpdateDTO) {
        let foundAsset = await this.assetRepository.findOne(id, { relations: ['uploads'] });
        if (!foundAsset) {
            throw new NotFoundException("Asset not found");
        }

        if (foundAsset.uploads.length) {
            throw new NotAcceptableException("File extension cannot be changed after a file was uploaded");
        }

        foundAsset.extension = assetUpdateDTO.extension;

        return await this.assetRepository.save(foundAsset);
    }

    async findAsset(id: string): Promise<Asset> {
        let foundAsset = await this.assetRepository.findOne(id);

        if (!foundAsset) {
            throw new NotFoundException("Asset not found");
        }
        return foundAsset;
    }

    async deleteAsset(id: string): Promise<void> {
        this.assetRepository.delete(id);
    }

    async addAssetToBriefing(briefingId: string, assetCreateDTO: AssetCreateDTO): Promise<Asset> {
        const briefingWithAssets = await this.briefingsService.getBriefingById(briefingId);

        this.validateAsset(briefingWithAssets, assetCreateDTO);

        const asset = this.assetDTOToAssetConverter.convertWithAdditionalAttributes(briefingWithAssets, assetCreateDTO);

        await this.assetRepository.save(asset);

        return asset;
    }

    protected validateAsset(briefing: Briefing, assetCreateDTO: AssetCreateDTO): void {
        // validate uniqueness of attributes
        const match = briefing.assets.find((asset: Asset) => {
            if (
                assetCreateDTO.variant === asset.variant &&
                assetCreateDTO.camera === asset.camera) {
                return asset;
            }
        })

        if (match) {
            throw new UniqueContraintException('Combination of Scene, Variant and Camera must be unique', HttpStatus.BAD_REQUEST);
        }
    }

}
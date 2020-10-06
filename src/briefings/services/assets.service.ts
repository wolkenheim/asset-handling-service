import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { AssetUpdateDTO } from "../dto/asset-update.dto";
import { CreateAssetDTO } from "../dto/create-asset.dto";
import { Asset } from "../entity/asset.entity";
import { AssetRepository } from "../repositories/asset.repository";

@Injectable()
export class AssetsService {

    constructor(private readonly assetRepository: AssetRepository) { }

    createAsset() {

    }


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

}
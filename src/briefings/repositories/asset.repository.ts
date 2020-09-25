import { Repository, EntityRepository } from "typeorm";
import { Asset } from "../entity/asset.entity";
import { NotFoundException } from "@nestjs/common";
import { Upload } from "../entity/upload.entity";

@EntityRepository(Asset)
export class AssetRepository extends Repository<Asset> {

    async addUploadToAsset(assetId: string, upload: Upload): Promise<Upload> {
        // @todo: not necessary to load whole list. simply save with id and/or read typeORM docs
        return await this.save(upload);
    }


}
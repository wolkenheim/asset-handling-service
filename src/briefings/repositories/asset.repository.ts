import { Repository, EntityRepository } from "typeorm";
import { Asset } from "../entity/asset.entity";
import { Upload } from "../entity/upload.entity";
import { UploadRepository } from "./upload.repository";

@EntityRepository(Asset)
export class AssetRepository extends Repository<Asset> {

    constructor(private readonly uploadRepository: UploadRepository) {
        super();
    }

    removeUpload(upload: Upload) {
        this.uploadRepository.remove(upload);
    }

}
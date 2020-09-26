import { Repository, EntityRepository } from "typeorm";
import { Asset } from "../entity/asset.entity";
import { Upload } from "../entity/upload.entity";
import { getConnection } from "typeorm";

@EntityRepository(Asset)
export class AssetRepository extends Repository<Asset> {

}
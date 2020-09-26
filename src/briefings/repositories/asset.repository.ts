import { Repository, EntityRepository } from "typeorm";
import { Asset } from "../entity/asset.entity";

@EntityRepository(Asset)
export class AssetRepository extends Repository<Asset> {

}
import { Repository, EntityRepository } from "typeorm";
import { Upload } from "../entity/upload.entity";

@EntityRepository(Upload)
export class UploadRepository extends Repository<Upload> {

}
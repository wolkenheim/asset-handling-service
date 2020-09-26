import { AssetType } from "../asset-types.enum";
import { CreateAssetDTO } from "../dto/create-asset.dto";
import { Asset } from "../entity/asset.entity";
import { Converter } from "./converter.interface";
import { Briefing } from "../entity/briefing.entity";
import { CreateUploadDTO } from "../dto/create-upload.dto";
import { Upload } from "../entity/upload.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadDTOToUploadConverter implements Converter<CreateUploadDTO, Upload> {
    public convert(createUploadDTO: CreateUploadDTO): Upload {
        const upload = new Upload();

        upload.fileName = createUploadDTO.fileName;
        upload.hashedName = createUploadDTO.hashedName;

        return upload;
    }
}
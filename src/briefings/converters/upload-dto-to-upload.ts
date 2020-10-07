import { AssetType } from "../entity/asset-type.enum";
import { Converter } from "./converter.interface";
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
import { AssetType } from "../entity/asset-type.enum";
import { Converter } from "./converter.interface";
import { UploadCreateDTO } from "../dto/upload-create.dto";
import { Upload } from "../entity/upload.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadDTOToUploadConverter implements Converter<UploadCreateDTO, Upload> {
    public convert(uploadCreateDTO: UploadCreateDTO): Upload {
        const upload = new Upload();

        upload.fileName = uploadCreateDTO.fileName;
        upload.hashedName = uploadCreateDTO.hashedName;

        return upload;
    }
}
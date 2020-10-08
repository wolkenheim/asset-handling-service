import { Injectable } from "@nestjs/common";
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';
import { axiosDam } from '../clients/axios-dam';
import { FileServiceS3 } from "./file.service.s3";
import * as concat from 'concat-stream';
import { Stream } from "form-data";

@Injectable()
export class FileUploadService {
    constructor(private readonly fileService: FileServiceS3) { }

    async uploadToDam() {
        const fileName = 'me.jpg';
        const localFilePath = './uploads/' + fileName;
        const exists = fs.existsSync(localFilePath);

        //let result = await this.copyFromS3ToLocal(localFilePath);


        const localReadStream = fs.createReadStream(localFilePath);
        //let localReadStream = this.fileService.getReadStream('006581bf-47d4-404a-b681-796c878cc631.pdf');

        //let testWriteStream = fs.createWriteStream('./uploads/me_test.jpg');

        //localReadStream.pipe(testWriteStream);

        await this.postStreamToDam(localReadStream, fileName);
    }

    async copyFromS3ToLocal(localFilePath: string): Promise<void> {
        const file = fs.createWriteStream(localFilePath);

        const readStream = this.fileService.getReadStream('006581bf-47d4-404a-b681-796c878cc631.pdf');

        readStream.pipe(file)
    }

    async postStreamToDam(readStream: Stream, fileName: string) {
        process.env.DAM_ELVIS_URL = "http://localhost:3001"
        const createURL = process.env.DAM_ELVIS_URL + '/services/create';

        const bodyFormData = new FormData();
        bodyFormData.append('Filedata', readStream);
        bodyFormData.append('assetPath', '/Client/Ztest/test/' + fileName);

        const axiosInstance = await axiosDam();


        try {
            const result = await axiosInstance({
                method: 'POST',
                url: createURL,
                data: bodyFormData,
                headers: bodyFormData.getHeaders()
            });

            if (result.data.hasOwnProperty('id')) {
                return { 'message': result.data.id };
            }
        } catch (error) {
            if (error.response.status === 418) {
                console.log("faked error received");
            } else {
                console.log(error);
            }
        }

    }
}
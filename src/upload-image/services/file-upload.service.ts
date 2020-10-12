import { Injectable } from "@nestjs/common";
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';
import { axiosDam } from '../clients/axios-dam';
import { FileServiceS3 } from "./file.service.s3";
import * as concat from 'concat-stream';
import { Stream } from "form-data";
import * as config from 'config';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileService: FileServiceS3) { }

    async uploadToDam() {
        const fileName = 'ada.obj';
        const localFilePath = './uploads/' + fileName;


        let result = await this.copyFromS3ToLocal(localFilePath);
        console.log("exists", fs.existsSync(localFilePath))

        let localReadStream = fs.createReadStream(localFilePath);

        await this.postStreamToDam(localReadStream, fileName);
    }

    async copyFromS3ToLocal(localFilePath: string): Promise<void> {

        let response = await axios({
            method: 'get',
            responseType: 'stream',
            url: 'https://asdasd-2323239c-23232323-11234casawqwqwqw-qwqwqwqwivdfferer34.s3.eu-central-1.amazonaws.com/Aida+1_Ai-2835_3D+Model+-+Low-Poly.obj'
        })

        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(localFilePath);
            response.data.pipe(file)
            file.on('close', () => {
                resolve();
            });
            //const readStream = this.fileService.getReadStream('006581bf-47d4-404a-b681-796c878cc631.pdf');

        });

    }

    async postStreamToDam(readStream: Stream, fileName: string) {

        const createURL = config.DAM_ELVIS_URL + '/services/create';

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
                console.log(result.data);
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
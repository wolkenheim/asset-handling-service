import { Body, Controller, Post } from "@nestjs/common";
import { PresignedService } from "../services/presigned.service";
import { RequestUrlDTO } from "../dto/request-url.dto";

@Controller()
export class PresignedController {

    constructor(private readonly presignedService: PresignedService) { }

    @Post('upload-url')
    async getPresignedUrl(@Body() filePath: RequestUrlDTO) {
        return this.presignedService.getPresignedUrl(filePath);
    }
}
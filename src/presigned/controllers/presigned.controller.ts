import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { PresignedService } from "../services/presigned.service";
import { RequestUrlDTO } from "../dto/request-url.dto";
import { PresignedEntity } from "../entity/presigned.entity";

@Controller()
export class PresignedController {

    constructor(private readonly presignedService: PresignedService) { }

    @Post('api/upload-url')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getPresignedUrl(@Body() filePath: RequestUrlDTO): Promise<PresignedEntity> {
        return this.presignedService.getPresignedUrl(filePath);
    }
}
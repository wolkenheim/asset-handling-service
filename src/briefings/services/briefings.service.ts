import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { BriefingRepository } from '../repositories/briefing.repository';
import { BriefingCreateDTO } from '../dto/briefing-create.dto';
import { Briefing } from '../entity/briefing.entity';
import { UniqueContraintException } from '../exceptions/unique-contraint.exception';
import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BriefingsService {

    constructor(
        private readonly briefingRepository: BriefingRepository,
        private readonly briefingDTOToBriefingConverter: BriefingDTOToBriefingConverter,
    ) { }

    async getAllBriefings(): Promise<Briefing[]> {
        return this.briefingRepository.getBriefings();
    }

    async getBriefingById(id: string): Promise<Briefing> {
        const foundBriefing = this.briefingRepository.findOne(id, { relations: ["assets"] });

        if (!foundBriefing) {
            throw new NotFoundException("Briefing not found");
        }

        return foundBriefing;
    }

    async createBriefing(briefingCreateDTO: BriefingCreateDTO): Promise<Briefing> {

        const foundBriefing = await this.briefingRepository.findOne(briefingCreateDTO.id, { relations: ["assets"] });

        if (foundBriefing) {
            throw new UniqueContraintException('Briefing UUID already exists', HttpStatus.BAD_REQUEST);
        }

        const briefing = this.briefingDTOToBriefingConverter.convert(briefingCreateDTO);

        return this.briefingRepository.createBriefingWithAssets(briefing);
    }

}

import { Briefing } from "../entity/briefing.entity";
import { Repository, EntityRepository } from "typeorm";
import { Asset } from "../entity/asset.entity";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Briefing)
export class BriefingRepository extends Repository<Briefing> {

    async createBriefingWithAssets(briefing: Briefing): Promise<Briefing> {
        return await this.save(briefing);
    }


    async getBriefings(): Promise<Briefing[]> {
        return this.find({ relations: ["assets"] })
        /*
        const query = this.createQueryBuilder('briefing');
        query.relation('assets');
        const briefings = await query.getMany();
        return briefings;
        */
    }

    async deleteAsset(assetId: string): Promise<void> {
        const result = await this.createQueryBuilder()
            .delete()
            .from(Asset)
            .where("id = :id", { id: assetId })
            .execute();

        if (result.affected === 0) {
            throw new NotFoundException("Asset not found");
        }
    }

}
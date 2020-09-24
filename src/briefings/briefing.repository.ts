import { Briefing } from "./entity/briefing.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Briefing)
export class BriefingRepository extends Repository<Briefing> {

    async createBriefingWithAssets(briefing: Briefing): Promise<Briefing> {

        briefing = await this.save(briefing);

        return briefing;
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

}
import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Upload } from 'src/briefings/entity/upload.entity';
import { QueueNames } from './queue-names.enum'
import axios from 'axios';
import { Briefing } from 'src/briefings/entity/briefing.entity';

@Processor('image')
export class UploadProcessor {
    private readonly logger = new Logger(UploadProcessor.name);

    constructor(private httpService: HttpService) { }

    @Process(QueueNames.COPY)
    async handleTranscode(job: Job<Upload>) {
        const upload: Upload = job.data;
        this.logger.debug('Start copying...');
        this.logger.debug(upload);

        const result = await axios.get('http://localhost:3000/briefing');
        //console.log(result.data)


        const myObservable = this.httpService
            .get<Briefing[]>('http://localhost:3000/briefing')
            .pipe(map(result => {
                return result.data;
            }))
            .pipe(
                map(data => {
                    console.log("map", JSON.stringify(data));
                    return data;
                })
            )
            .subscribe({
                next: x => console.log('Observer got a next value: ' + x),
                error: err => console.error('Observer got an error: ' + err),
                complete: () => console.log('Observer got a complete notification'),
            });


        job.progress(100);
    }

    @OnQueueFailed()
    jobFailed(job: Job, err: Error) {
        this.logger.error(`job ${job.id} failed with ${err.message}`)
    }



}
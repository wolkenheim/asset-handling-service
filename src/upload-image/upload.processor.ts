import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Upload } from 'src/briefings/entity/upload.entity';
import { QueueNames } from './queue-names.enum'

@Processor('image')
export class UploadProcessor {
    private readonly logger = new Logger(UploadProcessor.name);

    @Process(QueueNames.COPY)
    async handleTranscode(job: Job<Upload>) {
        let upload: Upload = job.data;
        this.logger.debug('Start copying...');
        this.logger.debug(upload);

        job.progress(100);
    }

    @OnQueueFailed()
    jobFailed(job: Job, err: Error) {
        this.logger.error(`job ${job.id} failed with ${err.message}`)
    }



}
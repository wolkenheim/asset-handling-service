import { readFile } from 'fs';
import * as util from 'util';
import { DataReader } from './data-reader.interface';

export class DataReaderImpl implements DataReader {
    data: string = "";

    constructor(protected filename: string) { }

    public async read(): Promise<void> {
        const readFileAsync = util.promisify(readFile);
        this.data = await readFileAsync(this.filename, 'utf8');
    }
}
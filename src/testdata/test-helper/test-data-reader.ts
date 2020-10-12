import { readFile } from 'fs';
import * as util from 'util';
import { DataReader } from './data-reader.interface';

export class TestDataReader implements DataReader {
    data: string = "";
    filename: string = 'testdata/briefings.json'

    constructor() { }

    public async read(): Promise<void> {
        const readFileAsync = util.promisify(readFile);
        this.data = await readFileAsync(this.filename, 'utf8');
    }
}
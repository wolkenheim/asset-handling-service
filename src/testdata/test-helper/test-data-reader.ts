import { readFile } from 'fs';
import * as util from 'util';

export class TestDataReader {
    public async read(): Promise<{ [key: string]: string }[]> {
        const result = await this.readTestData();
        const briefings = JSON.parse(result);
        return briefings;
    }

    protected async readTestData(): Promise<string> {
        const readFileAsync = util.promisify(readFile);
        const result = await readFileAsync('testdata/briefings.json', 'utf8');
        return result;
    }
}
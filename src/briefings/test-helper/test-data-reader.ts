import { readFile } from 'fs';
import * as util from 'util';

export class TestDataReader {
    public async read() {
        let result = await this.readTestData();
        let briefings = JSON.parse(result);
        let briefingParam = briefings[0];

        return briefingParam;
    }

    protected async readTestData(): Promise<string> {
        const readFileAsync = util.promisify(readFile);
        let result = await readFileAsync('testdata/briefings.json', 'utf8');
        return result;
    }
}
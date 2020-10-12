import { DataReader } from "./data-reader.interface";

export type testBriefingJSON = { [key: string]: string }[];

export class JsonParser {

    constructor(protected readonly dataReader: DataReader) { }

    async parse(): Promise<testBriefingJSON> {
        await this.dataReader.read();
        const briefings = JSON.parse(this.dataReader.data);
        return briefings;
    }
}
import { JsonParser, testBriefingJSON } from "../../testdata/test-helper/json-parser";
import { DataReaderImpl } from "./data-reader-impl";

export class TestDataClient {
    static async getTestData(): Promise<testBriefingJSON> {
        return await new JsonParser(new DataReaderImpl('testdata/briefings.json')).parse();
    }
}
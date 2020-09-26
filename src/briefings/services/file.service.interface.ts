

export interface FileService {

    validateFileExists(fileName: string): Promise<boolean>;
}
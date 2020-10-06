export class PresignedEntity {
    constructor(private hashedName: string, private preSignedUrl: string, private fileName: string) { }
}
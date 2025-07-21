export class FileSignatures {
    constructor(
        public signature: string,
        public keyId: number,
        public userId: number,
        public fileId: number,
    ) {}
}
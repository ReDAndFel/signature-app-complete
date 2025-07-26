export class FileSignatures {
    constructor(
        public signature: string,
        public keyId: number,
        public userId: number,
        public fileId: number,
        public createdAt?: Date,
        public user?: {
            id: number;
            name: string;
            email: string;
        }
    ) {}
}
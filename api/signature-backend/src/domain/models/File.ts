export class File {
    constructor(
        public fileName: string,
        public mimeType: string,
        public size: number,
        public path: string,
        public id?: number,
        public userId?: number,
    ) {}
}
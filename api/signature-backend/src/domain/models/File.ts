export class File {
    constructor(
        public fileName: string,
        public hash: string,
        public path: string,
        public userId: number,
        public id?: number,
    ) {}
}
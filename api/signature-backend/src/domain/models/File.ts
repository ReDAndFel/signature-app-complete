export class File {
    constructor(
        public fileName: string,
        public hash: string,
        public path: string,
        public id?: number,
        public userId?: number,
    ) {}
}
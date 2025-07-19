export declare class File {
    fileName: string;
    hash: string;
    path: string;
    id?: number | undefined;
    userId?: number | undefined;
    constructor(fileName: string, hash: string, path: string, id?: number | undefined, userId?: number | undefined);
}

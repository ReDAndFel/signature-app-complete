export declare class File {
    fileName: string;
    mimeType: string;
    size: number;
    path: string;
    id?: number | undefined;
    userId?: number | undefined;
    constructor(fileName: string, mimeType: string, size: number, path: string, id?: number | undefined, userId?: number | undefined);
}

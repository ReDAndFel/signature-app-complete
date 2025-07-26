export class SharedFile {
  constructor(
    public fileId: number,
    public ownerUserId: number,
    public sharedWithUserId: number,
    public id?: number
  ) {}
}

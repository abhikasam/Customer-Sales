import { Author } from "./author.model";

export class Book {
  constructor(
    public _id: number,
    public title: string,
    public shortDescription: string,
    public longDescription: string,
    public isbn: string,
    public publishedDate: Date,
    public status: string,
    public pageCount: number,
    public thumbnailUrl: string,
    public categories: string[],
    public authors: Author[]
  ) { }

  static empty() {
    return new Book(0,'','','','',new Date(),'',0,'',[],[])
  }

}

import { Injectable } from "@nestjs/common";

export interface Document {
  id: number;
  title: string;
  createdAt: Date;
}

@Injectable()
export class DocumentsService {
  private documents: Document[] = [
    {
      id: 1,
      title: "Sample Document 1",
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Sample Document 2",
      createdAt: new Date(),
    },
  ];

  findAll(): Document[] {
    return this.documents;
  }
}

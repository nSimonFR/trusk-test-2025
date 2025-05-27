import { Controller, Get } from "@nestjs/common";
import { DocumentsService, Document } from "./documents.service";

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findAll(): Document[] {
    return this.documentsService.findAll();
  }
}

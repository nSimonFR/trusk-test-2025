import { Controller, Get, Param } from "@nestjs/common";
import { DocumentStorageService } from "./document-storage.service";
import { DocumentsService, Document } from "./documents.service";

@Controller("documents")
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly documentStorageService: DocumentStorageService,
  ) {}

  @Get()
  findAll(): Document[] {
    return this.documentsService.findAll();
  }

  @Get(":id/url")
  async getDocumentUrl(@Param("id") id: string): Promise<{ url: string }> {
    const url = await this.documentStorageService.getSignedUrl(id);
    return { url };
  }
}

import { Test } from "@nestjs/testing";
import Database = require("better-sqlite3");
import { DATABASE } from "../database/database.module";
import { seed } from "../database/seed";
import { DocumentStorageService } from "./document-storage.service";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";

describe("DocumentsController", () => {
  let controller: DocumentsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        DocumentsService,
        {
          provide: DATABASE,
          useFactory: () => {
            const db = new Database(":memory:");
            seed(db);
            return db;
          },
        },
        {
          provide: DocumentStorageService,
          useValue: {
            getSignedUrl: jest
              .fn()
              .mockResolvedValue("https://signed.example.com/documents/1.pdf"),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(DocumentsController);
  });

  it("returns the list of documents", () => {
    expect(controller.findAll()).toHaveLength(2);
  });

  it("returns a signed URL for a document", async () => {
    await expect(controller.getDocumentUrl("1")).resolves.toEqual({
      url: "https://signed.example.com/documents/1.pdf",
    });
  });
});

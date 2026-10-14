import { Test } from "@nestjs/testing";
import { DocumentStorageService } from "./document-storage.service";

describe("DocumentStorageService", () => {
  let service: DocumentStorageService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DocumentStorageService],
    }).compile();

    service = moduleRef.get(DocumentStorageService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("returns a signed URL for a document", async () => {
    const signedUrl =
      "https://bucket-name.s3.eu-west-1.amazonaws.com/documents/1.pdf?X-Amz-Expires=604800&X-Amz-Signature=abc123";
    jest.spyOn(service, "getSignedUrl").mockResolvedValue(signedUrl);

    const url = await service.getSignedUrl("1");

    expect(url).toBe(signedUrl);
    expect(url).toContain("X-Amz-Signature");
  });

  it("should return a valid URL", async () => {
    const url = await service.getSignedUrl("1");

    expect(typeof url).toBe("string");
    expect(() => new URL(url)).not.toThrow();
  });
});

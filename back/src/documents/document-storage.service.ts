import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

const DOCUMENTS_BUCKET = process.env.DOCUMENTS_BUCKET ?? "bucket-name";
const AWS_REGION = process.env.AWS_REGION ?? "eu-west-1";
const SIGNED_URL_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;
const SAMPLE_DOCUMENT_URL = "https://pdfobject.com/pdf/sample.pdf";

@Injectable()
export class DocumentStorageService {
  private readonly logger = new Logger(DocumentStorageService.name);

  async getSignedUrl(documentId: string): Promise<string> {
    if (!process.env.AWS_ACCESS_KEY_ID) {
      this.logger.warn(
        "AWS credentials are not configured, serving the sample document",
      );
      return SAMPLE_DOCUMENT_URL;
    }

    const s3 = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new GetObjectCommand({
      Bucket: DOCUMENTS_BUCKET,
      Key: `documents/${documentId}.pdf`,
    });

    try {
      const url = await getSignedUrl(s3, command, {
        expiresIn: SIGNED_URL_EXPIRES_IN_SECONDS,
      });
      this.logger.log(`Signed URL generated for document ${documentId}: ${url}`);
      return url;
    } catch (error) {
      this.logger.error(`Failed to sign URL for document ${documentId}`, error);
      throw new InternalServerErrorException("Unable to generate document URL");
    }
  }
}

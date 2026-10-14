import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Document SDK bootstrap.
 *
 * In production, documents live in a private S3 bucket and are opened through
 * a short-lived pre-signed URL (see `getSignedDocumentUrl` below).
 *
 * For this exercise there is no AWS account: `getDocumentUrl` stands in for
 * the SDK and always returns the same public sample PDF, whatever the id.
 * Treat it as if it returned a real signed URL.
 */
export async function getDocumentUrl(docId: string): Promise<string> {
  return "https://pdfobject.com/pdf/sample.pdf";
}

// Reference only, never called here: what the real signing looks like.
export async function getSignedDocumentUrl(docId: string): Promise<string> {
  const s3 = new S3Client({
    region: "eu-west-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: "bucket-name",
    Key: `documents/${docId}.pdf`,
  });

  // TODO: how long should this URL stay valid?
  const options = {};

  return getSignedUrl(s3, command, options);
}

export default getDocumentUrl;

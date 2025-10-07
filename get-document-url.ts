import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function getDocumentUrl(docId: string) {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucketName = "bucket-name";
  const region = "eu-west-1";

  const s3 = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: `documents/${docId}.pdf`,
  });

  // TODO:
  const options = {};

  const signedUrl = await getSignedUrl(s3, command, options);
  return signedUrl;
}

async function getDocumentUrlMocked(docId: string) {
  return `https://pdfobject.com/pdf/sample.pdf`;
}

export default getDocumentUrlMocked;

/**
 * Document SDK, bootstrap version.
 *
 * In production, documents sit in a private S3 bucket under a storage key
 * (e.g. "documents/1.pdf"), and this call returns a pre-signed URL to read
 * one, valid for `expiresInSeconds`.
 *
 * No AWS account is needed for the exercise: it always returns the same
 * public sample PDF. Treat the result as a real signed URL.
 *
 * Usage:
 *   const url = await getDocumentUrl("documents/1.pdf", { expiresInSeconds: 120 });
 */
export async function getDocumentUrl(
  key: string,
  options: { expiresInSeconds: number },
): Promise<string> {
  return "https://pdfobject.com/pdf/sample.pdf";
}

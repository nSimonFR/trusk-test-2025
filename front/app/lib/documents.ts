import type { Document } from "../../../back/src/documents/documents.service";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3005";
const SIGNED_URL_REVALIDATE_SECONDS = 60 * 60;

export async function getDocuments(): Promise<Document[]> {
  const res = await fetch(`${BACKEND_URL}/documents`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch documents (${res.status})`);
  }
  return res.json();
}

export async function getDocumentUrl(id: string): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/documents/${id}/url`, {
    next: { revalidate: SIGNED_URL_REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch document URL (${res.status})`);
  }
  const { url } = await res.json();
  return url;
}

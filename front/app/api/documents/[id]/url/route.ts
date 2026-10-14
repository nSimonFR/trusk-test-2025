import { NextResponse } from "next/server";
import { getDocumentUrl } from "../../../../lib/documents";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const url = await getDocumentUrl(id);
    return NextResponse.json({ url });
  } catch (error) {
    console.error(`Unable to get URL for document ${id}`, error);
    return NextResponse.json({ url: null });
  }
}

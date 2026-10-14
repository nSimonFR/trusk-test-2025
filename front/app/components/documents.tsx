"use client";

import { useState } from "react";

import type { Document } from "../../../back/src/documents/documents.service";

type DocumentsProps = {
  documents: Document[];
};

export default function Documents({ documents }: DocumentsProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openDocument = async (id: number) => {
    setIsOpening(true);
    setError(null);

    try {
      const res = await fetch(`/api/documents/${id}/url`);
      if (!res.ok) throw new Error("Failed to get document URL");

      const { url } = await res.json();
      if (url) {
        window.open(url, "_blank");
      }
    } catch (err) {
      console.error("Error opening document", err);
      setError("Unable to open the document. Please try again.");
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <>
      {error && (
        <tr>
          <td colSpan={2} className="p-2 text-sm text-red-600">
            {error}
          </td>
        </tr>
      )}
      {documents.map((doc) => (
        <tr key={doc.id}>
          <td className="p-2 border-b border-gray-200">{doc.title}</td>
          <td className="p-2 border-b border-gray-200">
            <button
              onClick={() => openDocument(doc.id)}
              disabled={isOpening}
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isOpening ? "Opening..." : "Open doc"}
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

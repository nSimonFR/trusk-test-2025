"use client";

import { useEffect, useState } from "react";

// Assume you have a way to import the Document type from the back-end
import { Document } from "../../../back/src/documents/documents.service";

const BACKEND_URL = "http://localhost:3005";

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);

  // TODO / BONUS: Optimize/Remove the useEffect !?
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/documents`);
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };

    fetchDocuments();
  }, []);

  return documents.map((doc) => (
    <tr key={doc.id}>
      <td className="p-2 border-b border-gray-200">{doc.title}</td>
      <td className="p-2 border-b border-gray-200">
        <button
          onClick={() => {
            /* TODO: open the document */
          }}
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Open doc
        </button>
      </td>
    </tr>
  ));
}

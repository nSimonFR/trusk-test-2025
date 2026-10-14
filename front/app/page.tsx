import Documents from "./components/documents";
import { getDocuments } from "./lib/documents";

export default async function Page() {
  const documents = await getDocuments();

  return (
    <div className="p-8 font-sans">
      <h1 className="mb-4 text-2xl font-bold">Document List</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 border-b border-gray-300">Name</th>
            <th className="p-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          <Documents documents={documents} />
        </tbody>
      </table>
    </div>
  );
}

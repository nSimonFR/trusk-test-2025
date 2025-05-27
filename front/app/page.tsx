import Documents from "./components/documents";

export default function Page() {
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
          <Documents />
        </tbody>
      </table>
    </div>
  );
}

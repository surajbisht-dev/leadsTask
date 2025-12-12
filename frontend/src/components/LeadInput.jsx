import { useState } from "react";
import { processNames } from "../services/api";

export default function LeadInput({ onProcessed }) {
  const [names, setNames] = useState("");

  const handleSubmit = async () => {
    if (!names.trim()) return alert("Enter names first!");
    const res = await processNames(names);
    onProcessed(res.data.data);
    setNames("");
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h2 className="text-xl font-semibold mb-2">
        Enter Names (comma-separated)
      </h2>
      <input
        className="border p-2 w-full mb-2"
        value={names}
        onChange={(e) => setNames(e.target.value)}
        placeholder="Peter, Aditi, Ravi..."
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Process
      </button>
    </div>
  );
}

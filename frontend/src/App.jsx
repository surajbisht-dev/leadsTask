import { useEffect, useState, useCallback } from "react";
import LeadInput from "./components/LeadInput";
import LeadTable from "./components/LeadTable";
import { getLeads } from "./services/api";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchLeads = useCallback(async () => {
    const res = await getLeads(filter);
    setLeads(res.data);
  }, [filter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Smart Lead Automation System
      </h1>

      <LeadInput onProcessed={fetchLeads} />

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setFilter("")}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilter("Verified")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Verified
        </button>

        <button
          onClick={() => setFilter("To Check")}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          To Check
        </button>
      </div>

      <LeadTable leads={leads} />
    </div>
  );
}

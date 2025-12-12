export default function LeadTable({ leads }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Name</th>
          <th className="p-2">Country</th>
          <th className="p-2">Probability</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead._id} className="border">
            <td className="p-2">{lead.name}</td>
            <td className="p-2">{lead.country}</td>
            <td className="p-2">{(lead.probability * 100).toFixed(2)}%</td>
            <td
              className={`p-2 font-bold ${
                lead.status === "Verified"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {lead.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import { useEffect } from "react";
import useSuggestionsStore from "../store/suggestionsStore";

export default function Suggestions() {
  const { suggestions, loading, error, fetchSuggestions } = useSuggestionsStore();

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  if (loading) return <p className="text-center text-gray-500">Loading suggestions...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!suggestions.length) return <p className="text-center text-gray-500">No suggestions at the moment.</p>;

  return (
    <div className="bg-gray-100 rounded-xl shadow" style={{ padding: '16px', marginTop: '16px', marginBottom: '24px' }}>
      <h2 className="text-lg font-semibold" style={{ marginBottom: '8px' }}>
        Smart Suggestions 💡
      </h2>
      <ul className="list-disc list-inside space-y-1">
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

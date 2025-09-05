"use client";

import { useState } from "react";

export default function UnstableCacheDemo() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/unstable-cache");
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">unstable_cache Demo</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Next.jsのunstable_cacheを使用したデータキャッシュのデモ
      </p>

      <button
        type="button"
        onClick={fetchData}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Loading..." : "Fetch Cached Data"}
      </button>

      {result && (
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <pre className="text-sm overflow-x-auto">{result}</pre>
        </div>
      )}
    </div>
  );
}

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

  const revalidateCache = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/revalidate-tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: "demo-cache-tag" }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border   p-6 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">unstable_cache Demo</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Next.jsのunstable_cacheを使用したデータキャッシュのデモ
      </p>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500  text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "get"}
        </button>
        <button
          type="button"
          onClick={revalidateCache}
          disabled={loading}
          className="bg-red-500  text-white px-4 py-2 rounded"
        >
          revalidateTag
        </button>
      </div>

      {result && (
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <pre className="text-sm overflow-x-auto">{result}</pre>
        </div>
      )}
    </div>
  );
}

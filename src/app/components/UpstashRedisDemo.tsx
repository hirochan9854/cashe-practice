"use client";

import { useState } from "react";

export default function UpstashRedisDemo() {
  const [key, setKey] = useState("demo-key");
  const [value, setValue] = useState("demo-value");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setRedisData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/redis/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, value }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getRedisData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/redis/get?key=${encodeURIComponent(key)}`,
      );
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
      <h2 className="text-xl font-bold mb-4">Upstash Redis Demo</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Upstash Redisを使用したキーバリューストアのデモ
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border px-3 py-2 "
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-3 py-2 "
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={setRedisData}
          disabled={loading}
          className="bg-green-500  text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "set"}
        </button>
        <button
          type="button"
          onClick={getRedisData}
          disabled={loading}
          className="bg-blue-500  text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "get"}
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

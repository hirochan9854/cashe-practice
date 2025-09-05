import UnstableCacheDemo from "./components/UnstableCacheDemo";
import UpstashRedisDemo from "./components/UpstashRedisDemo";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="mb-20 text-2xl font-bold text-center">
          Next.js unstable_cache と Upstash Redis のデモ
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UnstableCacheDemo />
          <UpstashRedisDemo />
        </div>
      </main>
    </div>
  );
}

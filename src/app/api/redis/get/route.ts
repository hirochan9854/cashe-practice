import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return null;
    }

    const value = await redis.get(key);
    return Response.json({
      key,
      value,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Redis GET error:", error);
    return error;
  }
}

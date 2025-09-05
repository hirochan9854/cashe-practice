import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { key, value } = await request.json();

    if (!key || !value) {
      return null;
    }

    const result = await redis.set(key, value);
    return Response.json({
      success: true,
      key,
      value,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Redis SET error:", error);
    return error;
  }
}

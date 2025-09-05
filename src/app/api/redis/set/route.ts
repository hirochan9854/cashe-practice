import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { key, value } = await request.json();

    if (!key || !value) {
      return Response.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
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
    return Response.json(
      {
        error: "Failed to set data in Redis",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

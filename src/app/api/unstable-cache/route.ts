import { unstable_cache } from "next/cache";

const getCachedData = unstable_cache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      timestamp: new Date().toISOString(),
      random: Math.random(),
    };
  },
  ["demo-cache"],
  {
    revalidate: 30,
    tags: ["demo-cache-tag"],
  },
);

export async function GET() {
  try {
    const data = await getCachedData();
    return Response.json(data);
  } catch (_error) {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

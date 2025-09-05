import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tag } = body;

    if (!tag) {
      return Response.json({ error: "Tag is required" }, { status: 400 });
    }

    revalidateTag(tag);

    return Response.json({
      message: `Tag "${tag}" revalidated successfully`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return error;
  }
}

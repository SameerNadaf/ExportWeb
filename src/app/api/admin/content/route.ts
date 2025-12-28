import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminSession } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  // Public read allowed for content, but we only strictly implementing admin endpoint here.
  // We can relax this if needed, but safe to keep protected if only admin uses THIS endpoint.
  // Public pages will likely use a different read pattern or allow this one.
  // Let's protect it as it is under /api/admin/
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!key)
    return NextResponse.json({ error: "Key required" }, { status: 400 });

  try {
    const doc = await adminDb.collection("content").doc(key).get();
    if (!doc.exists) return NextResponse.json({});
    return NextResponse.json(doc.data());
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.key)
      return NextResponse.json({ error: "Key required" }, { status: 400 });

    await adminDb.collection("content").doc(data.key).set(data);

    // Revalidate
    if (data.key === "home") revalidatePath("/");
    if (data.key === "contact") revalidatePath("/contact");
    revalidatePath("/about"); // About also uses home data for Mission

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

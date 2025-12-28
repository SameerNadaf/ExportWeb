import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminSession } from "@/lib/auth-server";
import { Category } from "@/types/firestore";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const snapshot = await adminDb.collection("categories").get();
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(categories);
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

    // Check if updating or creating
    if (data.id) {
      await adminDb.collection("categories").doc(data.id).update(data);
      return NextResponse.json({ success: true });
    } else {
      const docRef = await adminDb.collection("categories").add({
        ...data,
        isActive: true,
      });
      return NextResponse.json({ id: docRef.id });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

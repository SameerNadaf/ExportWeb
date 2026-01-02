import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminSession } from "@/lib/auth-server";
import { Certificate } from "@/types/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

// POST: Create Certificate
export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    if (!data.title || !data.imageUrl) {
      return NextResponse.json(
        { error: "Title and Image are required" },
        { status: 400 }
      );
    }

    const newCert: Omit<Certificate, "id"> = {
      title: data.title,
      imageUrl: data.imageUrl,
      publicId: data.publicId, // Optional but recommended for cleanup
      createdAt: Timestamp.now() as any, // Cast to any to avoid client/server timestamp mismatch
    };

    const docRef = await adminDb.collection("certificates").add(newCert);

    // Revalidate Public Pages
    revalidatePath("/certifications");
    revalidatePath("/");

    return NextResponse.json({ id: docRef.id, ...newCert });
  } catch (error) {
    console.error("Create certificate error:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}

// DELETE: Delete Certificate
export async function DELETE(request: Request) {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const certRef = adminDb.collection("certificates").doc(id);
    const certSnap = await certRef.get();

    if (!certSnap.exists) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    const certData = certSnap.data();

    // Cleanup Cloudinary Image
    if (certData?.publicId) {
      // Import dynamically to avoid top-level issues if any
      const { default: cloudinary } = await import("@/lib/cloudinary");
      try {
        await cloudinary.uploader.destroy(certData.publicId);
      } catch (err) {
        console.error(`Failed to delete image ${certData.publicId}:`, err);
      }
    }

    await certRef.delete();

    // Revalidate Public Pages
    revalidatePath("/certifications");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete certificate error:", error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}

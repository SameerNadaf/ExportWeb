import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminSession } from "@/lib/auth-server";
import { Product } from "@/types/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

// GET: List all products
export async function GET() {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const snapshot = await adminDb
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Create Product
export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: "Name and Slug are required" },
        { status: 400 }
      );
    }

    const newProduct: Omit<Product, "id"> = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isActive: data.isActive ?? false, // Default to draft
      images: data.images || [],
      certifications: data.certifications || [],
    };

    const docRef = await adminDb.collection("products").add(newProduct);

    // Revalidate Public Pages
    revalidatePath("/products");
    revalidatePath(`/products/${data.categorySlug}`);
    revalidatePath("/"); // For 'Featured' if applicable elsewhere

    return NextResponse.json({ id: docRef.id, ...newProduct });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT: Update Product
export async function PUT(request: Request) {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const data = await request.json();
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    // Prevent overriding creation time
    delete updateData.createdAt;

    await adminDb.collection("products").doc(id).update(updateData);

    // Revalidate Public Pages
    revalidatePath("/products");
    if (data.categorySlug) revalidatePath(`/products/${data.categorySlug}`);
    if (data.slug && data.categorySlug)
      revalidatePath(`/products/${data.categorySlug}/${data.slug}`);
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE: Delete Product
export async function DELETE(request: Request) {
  const session = await verifyAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    // Fetch product to know slugs for revalidation (optional but good practice)
    // For now, simpler to just revalidate list pages
    await adminDb.collection("products").doc(id).delete();

    revalidatePath("/products");
    revalidatePath("/");
    // We cannot easily know the specific detail page URL without fetching before delete,
    // but revalidating list is most important.

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

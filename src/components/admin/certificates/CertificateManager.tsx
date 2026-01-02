"use client";

import { useState } from "react";
import { Certificate } from "@/types/firestore";
import { Trash2, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface CertificateManagerProps {
  initialCertificates: Certificate[];
}

export function CertificateManager({
  initialCertificates,
}: CertificateManagerProps) {
  const [certificates, setCertificates] =
    useState<Certificate[]>(initialCertificates);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !title) return;

    setIsUploading(true);
    try {
      // 1. Upload image via API
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("folder", "export-web/certificates");

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      // 2. Save to Firestore via API
      const newCertPayload = {
        title,
        imageUrl: uploadData.url,
        publicId: uploadData.publicId,
      };

      const createRes = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCertPayload),
      });

      if (!createRes.ok) throw new Error("Failed to save certificate");
      const createdCert = await createRes.json();

      // 3. Update local state
      const newCert: Certificate = {
        id: createdCert.id,
        ...newCertPayload,
        createdAt: new Date().toISOString(),
      } as Certificate;

      setCertificates([newCert, ...certificates]);

      // Reset form
      setTitle("");
      setImageFile(null);
      // Reset file input value
      const fileInput = document.getElementById(
        "cert-file"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error uploading certificate:", error);
      alert("Failed to upload certificate. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const res = await fetch(`/api/admin/certificates?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete certificate");

      setCertificates(certificates.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert("Failed to delete certificate.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        <h2 className="text-xl font-heading font-semibold mb-4">
          Add New Certificate
        </h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Certificate Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., ISO 9001:2015"
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Certificate Image
            </label>
            {imageFile ? (
              <div className="relative inline-block group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Certificate Preview"
                  className="h-48 w-auto object-contain rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    const fileInput = document.getElementById(
                      "cert-file"
                    ) as HTMLInputElement;
                    if (fileInput) fileInput.value = "";
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="cert-file"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors border-border hover:border-primary ${
                  isUploading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="cert-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required={!imageFile}
                />
              </label>
            )}
          </div>
          <button
            type="submit"
            disabled={isUploading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Certificate
              </>
            )}
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-card rounded-lg border border-border overflow-hidden group"
          >
            <div className="relative aspect-[4/3] bg-muted">
              <Image
                src={cert.imageUrl}
                alt={cert.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-medium truncate">{cert.title}</h3>
              <button
                onClick={() => cert.id && handleDelete(cert.id)}
                className="text-destructive hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No certificates uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}

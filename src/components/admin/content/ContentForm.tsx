"use client";

import { useState } from "react";

interface ContentFormProps {
  contactData: any;
  homeData: any;
}

export function ContentForm({ contactData, homeData }: ContentFormProps) {
  const [loading, setLoading] = useState(false);

  // Contact State
  const [phone, setPhone] = useState(contactData?.value?.phone || "");
  const [email, setEmail] = useState(contactData?.value?.email || "");
  const [address, setAddress] = useState(contactData?.value?.address || "");

  // Home State
  const [heroTitle, setHeroTitle] = useState(homeData?.value?.heroTitle || "");
  const [mission, setMission] = useState(homeData?.value?.mission || "");

  async function handleSave() {
    setLoading(true);
    try {
      // Save Contact
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "contact",
          value: { phone, email, address },
        }),
      });

      // Save Home
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "home",
          value: { heroTitle, mission },
        }),
      });

      alert("Content saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold border-b border-border pb-2">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="+91..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Office Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background resize-y"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold border-b border-border pb-2">
          Homepage Text
        </h2>
        <div className="space-y-2">
          <label className="text-sm font-medium">Hero Title</label>
          <input
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Mission Statement (Short)
          </label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background resize-y"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

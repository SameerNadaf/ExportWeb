"use client";

import { useState } from "react";

interface ContentFormProps {
  contactData: any;
  aboutData: any;
}

export function ContentForm({ contactData, aboutData }: ContentFormProps) {
  const [loading, setLoading] = useState(false);

  // Contact State
  const [phone, setPhone] = useState(contactData?.value?.phone || "");
  const [email, setEmail] = useState(contactData?.value?.email || "");
  const [address, setAddress] = useState(contactData?.value?.address || "");

  // Social Media State
  const [whatsapp, setWhatsapp] = useState(contactData?.value?.whatsapp || "");
  const [linkedin, setLinkedin] = useState(contactData?.value?.linkedin || "");
  const [instagram, setInstagram] = useState(
    contactData?.value?.instagram || ""
  );
  const [facebook, setFacebook] = useState(contactData?.value?.facebook || "");

  // About Page State
  const [aboutMission, setAboutMission] = useState(
    aboutData?.value?.mission || ""
  );
  const [aboutVision, setAboutVision] = useState(
    aboutData?.value?.vision || ""
  );

  async function handleSave() {
    setLoading(true);
    try {
      // Save Contact & Socials
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "contact",
          value: {
            phone,
            email,
            address,
            whatsapp,
            linkedin,
            instagram,
            facebook,
          },
        }),
      });

      // Save About Page Content
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "about",
          value: { mission: aboutMission, vision: aboutVision },
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

        <h3 className="text-sm font-bold pt-4 text-muted-foreground uppercase tracking-wider">
          Social Media Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              WhatsApp Number (with country code)
            </label>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="e.g. 919876543210"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn URL</label>
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="https://linkedin.com/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Instagram URL</label>
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook URL</label>
            <input
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold border-b border-border pb-2">
          About Page Content
        </h2>
        <div className="space-y-2">
          <label className="text-sm font-medium">Mission Statement</label>
          <textarea
            value={aboutMission}
            onChange={(e) => setAboutMission(e.target.value)}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background resize-y"
            placeholder="Our mission is to..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Vision Statement</label>
          <textarea
            value={aboutVision}
            onChange={(e) => setAboutVision(e.target.value)}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background resize-y"
            placeholder="Our vision is to..."
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

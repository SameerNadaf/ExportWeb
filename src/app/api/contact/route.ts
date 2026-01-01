import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, mobile, subject, message, website } =
      await request.json();

    // 1. Honeypot Check (Spam Bot Protection)
    if (website) {
      console.warn("Spam bot detected (Honeypot filled)");
      // Return fake success to fool the bot
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    }

    // 2. Early Validation
    if (!name || !email || !mobile || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 3. Rate Limiting (5 requests per hour per IP)
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown-ip";

    // Create a simple hash of the IP for privacy (optional but good practice)
    // For simplicity here, we'll just sanitize the IP string for document ID
    const sanitizedIp = ip.replace(/[^a-zA-Z0-9]/g, "_");
    const limitRef = adminDb.collection("rate_limits").doc(sanitizedIp);
    const limitDoc = await limitRef.get();

    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour

    if (limitDoc.exists) {
      const data = limitDoc.data();
      const lastAttempt = data?.lastAttempt || 0;
      const count = data?.count || 0;

      if (now - lastAttempt < windowMs) {
        if (count >= 5) {
          console.warn(`Rate limit exceeded for IP: ${ip}`);
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        await limitRef.update({
          count: count + 1,
          lastAttempt: now,
        });
      } else {
        // Reset window
        await limitRef.set({
          count: 1,
          lastAttempt: now,
        });
      }
    } else {
      await limitRef.set({
        count: 1,
        lastAttempt: now,
      });
    }

    // --- Proceed with Message Handling ---

    const timestamp = new Date();

    // 4. Save to Firestore
    await adminDb.collection("messages").add({
      name,
      email,
      mobile,
      subject,
      message,
      status: "new",
      createdAt: timestamp,
      ip: ip, // Store IP for internal tracking/blocking if needed
    });

    // 5. Fetch Admin Email
    const contactDoc = await adminDb.collection("content").doc("contact").get();
    const adminEmail = contactDoc.exists
      ? contactDoc.data()?.value?.email
      : process.env.ADMIN_EMAIL || "info@greenaryexport.com";

    // 6. Send Email via Nodemailer (if configured)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Boolean(process.env.SMTP_SECURE) || false,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_FROM_EMAIL || smtpUser}>`,
        to: adminEmail,
        subject: `New Inquiry: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Mobile: ${mobile}
Subject: ${subject}

Message:
${message}
        `,
        html: `
<h3>New Inquiry Received</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Mobile:</strong> ${mobile}</p>
<p><strong>Subject:</strong> ${subject}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      console.log("Email sent successfully to", adminEmail);
    } else {
      console.warn(
        "SMTP configuration missing. Email not sent, but message saved to database."
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

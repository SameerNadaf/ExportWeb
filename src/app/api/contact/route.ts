import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date();

    // 1. Save to Firestore
    await adminDb.collection("messages").add({
      name,
      email,
      subject,
      message,
      status: "new",
      createdAt: timestamp,
    });

    // 2. Fetch Admin Email
    const contactDoc = await adminDb.collection("content").doc("contact").get();
    const adminEmail = contactDoc.exists
      ? contactDoc.data()?.value?.email
      : process.env.ADMIN_EMAIL || "info@greenaryexport.com";

    // 3. Send Email via Nodemailer (if configured)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Boolean(process.env.SMTP_SECURE) || false, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_FROM_EMAIL || smtpUser}>`, // sender address
        to: adminEmail, // list of receivers
        subject: `New Inquiry: ${subject}`, // Subject line
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `, // plain text body
        html: `
<h3>New Inquiry Received</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
        `, // html body
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

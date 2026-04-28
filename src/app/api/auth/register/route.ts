import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "student",
      paymentStatus: "pending",
      isActive: false,
    });

    // Send welcome email to student
    await resend.emails.send({
      from: "Shrutivanam <noreply@shrutivanam.com>",
      to: email,
      subject: "Welcome to Shrutivanam — Registration Received",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d0b1e; color: #F5F0E8; padding: 40px; border-radius: 12px;">
          <h1 style="color: #C9A84C; font-size: 28px; margin-bottom: 8px;">🙏 Namaste, ${name}!</h1>
          <p style="color: #C8BFAD; line-height: 1.7;">Your registration at <strong>Shrutivanam</strong> has been received successfully.</p>
          <div style="background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3); border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="color: #E2C97E; font-weight: bold; margin: 0 0 8px;">Next Step: Complete Payment</p>
            <p style="color: #C8BFAD; margin: 0; font-size: 14px;">Please complete your payment using the UPI QR code shown on the website. Once payment is confirmed by our team, your account will be activated within 24 hours.</p>
          </div>
          <p style="color: #C8BFAD; font-size: 13px;">UPI ID: <strong style="color: #C9A84C;">${process.env.ADMIN_UPI_ID ?? "shrutivanam@upi"}</strong></p>
          <p style="color: #C8BFAD60; font-size: 12px; margin-top: 40px;">Shrutivanam — Ancient Wisdom, Modern Learning</p>
        </div>
      `,
    });

    // Notify admin
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: "Shrutivanam <noreply@shrutivanam.com>",
        to: process.env.ADMIN_EMAIL,
        subject: `New Registration: ${name} is awaiting payment approval`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Student Registration</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Status:</strong> Payment Pending</p>
            <a href="${process.env.NEXTAUTH_URL}/admin/users" style="background: #C9A84C; color: #0d0b1e; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 16px;">Review in Admin Panel</a>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { message: "Registration successful", userId: user._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

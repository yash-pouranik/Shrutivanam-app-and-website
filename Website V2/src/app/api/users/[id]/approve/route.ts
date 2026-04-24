import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();

  const user = await User.findByIdAndUpdate(
    id,
    { paymentStatus: "paid", isActive: true },
    { new: true }
  ).select("-password");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Send activation email
  await resend.emails.send({
    from: "Shrutivanam <noreply@shrutivanam.com>",
    to: user.email,
    subject: "🎉 Your Shrutivanam Account is Now Active!",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d0b1e; color: #F5F0E8; padding: 40px; border-radius: 12px;">
        <h1 style="color: #C9A84C; font-size: 28px; margin-bottom: 8px;">🙏 Namaste, ${user.name}!</h1>
        <p style="color: #C8BFAD; line-height: 1.7; font-size: 16px;">Great news! Your payment has been verified and your <strong>Shrutivanam</strong> account is now <strong style="color: #C9A84C;">active</strong>.</p>
        <div style="background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3); border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
          <p style="color: #E2C97E; font-weight: bold; margin: 0 0 16px; font-size: 18px;">You can now access your dashboard!</p>
          <a href="${process.env.NEXTAUTH_URL}/login" style="background: linear-gradient(135deg, #C9A84C, #E2C97E); color: #0d0b1e; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px; display: inline-block;">Login to Dashboard</a>
        </div>
        <p style="color: #C8BFAD; line-height: 1.7;">You now have access to all videos and upcoming Zoom sessions. Begin your journey of knowledge today.</p>
        <p style="color: #C8BFAD60; font-size: 12px; margin-top: 40px;">Shrutivanam — Ancient Wisdom, Modern Learning</p>
      </div>
    `,
  });

  return NextResponse.json({ message: "User approved successfully", user });
}

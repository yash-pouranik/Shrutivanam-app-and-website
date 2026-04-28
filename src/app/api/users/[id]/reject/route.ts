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
    { paymentStatus: "rejected", isActive: false },
    { new: true }
  ).select("-password");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Notify student
  await resend.emails.send({
    from: "Shrutivanam <noreply@shrutivanam.com>",
    to: user.email,
    subject: "Shrutivanam — Payment Verification Update",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d0b1e; color: #F5F0E8; padding: 40px; border-radius: 12px;">
        <h1 style="color: #C9A84C; font-size: 24px; margin-bottom: 8px;">🙏 Namaste, ${user.name}</h1>
        <p style="color: #C8BFAD; line-height: 1.7;">We were unable to verify your payment for your Shrutivanam registration.</p>
        <p style="color: #C8BFAD; line-height: 1.7;">This could be because the payment amount was incorrect or the reference could not be matched.</p>
        <div style="background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3); border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="color: #E2C97E; font-weight: bold; margin: 0 0 8px;">Please contact us:</p>
          <p style="color: #C8BFAD; margin: 0;">WhatsApp: <strong>+91 75665 85848</strong></p>
          <p style="color: #C8BFAD; margin: 4px 0 0;">Email: shrutivanam108@gmail.com</p>
        </div>
        <p style="color: #C8BFAD60; font-size: 12px; margin-top: 40px;">Shrutivanam — Ancient Wisdom, Modern Learning</p>
      </div>
    `,
  });

  return NextResponse.json({ message: "User rejected", user });
}

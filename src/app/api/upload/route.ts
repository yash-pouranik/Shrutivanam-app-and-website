import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateSignedParams } from "@/lib/cloudinary";

// GET /api/upload — Return signed params for direct client-side upload
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = generateSignedParams("shrutivanam/videos");
  return NextResponse.json(params);
}

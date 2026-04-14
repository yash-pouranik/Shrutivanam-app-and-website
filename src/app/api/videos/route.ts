import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Video from "@/models/Video";
import { z } from "zod";

const VideoSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  type: z.enum(["upload", "youtube", "link"]),
  url: z.string().url("Please enter a valid URL"),
  thumbnail: z.string().optional(),
  order: z.number().optional(),
});

// GET /api/videos — All active students + admin
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Students must be active
  if (session.user.role?.toLowerCase() === "student" && !session.user.isActive) {
    return NextResponse.json({ error: "Account not activated" }, { status: 403 });
  }

  await connectDB();
  const videos = await Video.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json({ videos });
}

// POST /api/videos — Admin only
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = VideoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  await connectDB();
  const video = await Video.create({
    ...parsed.data,
    addedBy: session.user.id,
  });

  return NextResponse.json({ video }, { status: 201 });
}

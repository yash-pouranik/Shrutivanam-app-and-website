import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Meeting from "@/models/Meeting";
import { z } from "zod";

const MeetingSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  joinUrl: z.string().url("Please enter a valid Zoom/Meet URL"),
  scheduledAt: z.string(), // ISO date string
  duration: z.number().min(15).max(480),
});

// GET /api/meetings — All active students + admin
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role?.toLowerCase() === "student" && !session.user.isActive) {
    return NextResponse.json({ error: "Account not activated" }, { status: 403 });
  }

  await connectDB();
  // Show upcoming meetings first, then past ones
  const meetings = await Meeting.find().sort({ scheduledAt: 1 });
  return NextResponse.json({ meetings });
}

// POST /api/meetings — Admin only
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = MeetingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  await connectDB();
  const meeting = await Meeting.create({
    ...parsed.data,
    scheduledAt: new Date(parsed.data.scheduledAt),
    addedBy: session.user.id,
  });

  return NextResponse.json({ meeting }, { status: 201 });
}

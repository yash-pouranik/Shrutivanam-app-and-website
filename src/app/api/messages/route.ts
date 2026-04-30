import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { z } from "zod";

const MessageSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  course: z.string().optional(),
  message: z.string().min(5),
});

// GET /api/messages — Admin only
export async function GET() {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json({ messages });
}

// POST /api/messages — Public contact form
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = MessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  await connectDB();
  const message = await Message.create(parsed.data);
  return NextResponse.json({ message }, { status: 201 });
}

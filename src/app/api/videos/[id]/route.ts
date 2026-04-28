import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Video from "@/models/Video";

// PATCH /api/videos/[id] — Admin: edit video
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  await connectDB();
  const video = await Video.findByIdAndUpdate(id, body, { new: true });
  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ video });
}

// DELETE /api/videos/[id] — Admin: delete video
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  await Video.findByIdAndDelete(id);

  return NextResponse.json({ message: "Video deleted" });
}

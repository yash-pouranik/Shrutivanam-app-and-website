import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// GET /api/users — Admin: list all students
export async function GET() {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const users = await User.find({ role: "student" })
    .select("-password")
    .sort({ createdAt: -1 });

  return NextResponse.json({ users });
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { decryptTransactionId } from "@/lib/transactionCrypto";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();

  const user = await User.findById(id).select(
    "paymentTransactionIdEncrypted paymentTransactionIdIv paymentTransactionIdTag",
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (
    !user.paymentTransactionIdEncrypted ||
    !user.paymentTransactionIdIv ||
    !user.paymentTransactionIdTag
  ) {
    return NextResponse.json({ transactionId: null });
  }

  const transactionId = decryptTransactionId({
    ciphertext: user.paymentTransactionIdEncrypted,
    iv: user.paymentTransactionIdIv,
    tag: user.paymentTransactionIdTag,
  });

  return NextResponse.json({ transactionId });
}

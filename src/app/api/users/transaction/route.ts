import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { encryptTransactionId } from "@/lib/transactionCrypto";

const TransactionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  transactionId: z.string().min(4, "Transaction ID is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = TransactionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { userId, transactionId } = parsed.data;

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.paymentStatus !== "pending") {
      return NextResponse.json(
        { error: "Payment already processed" },
        { status: 409 },
      );
    }

    const encrypted = encryptTransactionId(transactionId.trim());

    user.paymentTransactionIdEncrypted = encrypted.ciphertext;
    user.paymentTransactionIdIv = encrypted.iv;
    user.paymentTransactionIdTag = encrypted.tag;
    await user.save();

    return NextResponse.json({ message: "Transaction saved" });
  } catch (error) {
    console.error("Save transaction error:", error);
    return NextResponse.json(
      { error: "Unable to save transaction ID" },
      { status: 500 },
    );
  }
}

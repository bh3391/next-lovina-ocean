import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await prisma.setting.findUnique({ where: { id: "faq_data" } });
  return NextResponse.json(settings?.value || []);
}

export async function POST(req: Request) {
  const data = await req.json();
  const updated = await prisma.setting.upsert({
    where: { id: "faq_data" },
    update: { value: data },
    create: { id: "faq_data", value: data },
  });
  return NextResponse.json(updated);
}
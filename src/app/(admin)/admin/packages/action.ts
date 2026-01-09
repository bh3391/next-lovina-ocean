"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

export async function createPackage(formData: FormData) {
  const title = formData.get("title") as string;
  
  // Mengambil semua input itinerary
  const times = formData.getAll("itinerary_time") as string[];
  const activities = formData.getAll("itinerary_activity") as string[];
  
  // Mapping menjadi array of objects
  const itineraryData = times.map((time, index) => ({
    time: time,
    activity: activities[index]
  })).filter(item => item.time !== "" || item.activity !== ""); // Buang yang kosong

  try {
    await prisma.package.create({
      data: {
        title,
        slug: slugify(title, { lower: true, strict: true }),
        description: formData.get("description") as string,
        priceSharing: parseInt(formData.get("priceSharing") as string) || 0,
        pricePrivate: parseInt(formData.get("pricePrivate") as string) || 0,
        image: formData.get("image") as string,
        features: (formData.get("features") as string).split(",").map(f => f.trim()),
        // SIMPAN SEBAGAI JSON
        itinerary: itineraryData, 
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create package");
  }

  revalidatePath("/admin/packages");
  redirect("/admin/packages");
}
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * POST /api/seed
 * Seeds the database with initial categories and products.
 * Protect this endpoint in production (remove or add auth guard).
 */
export async function POST() {
  try {
    // Create categories
    const [women, men, accessories] = await Promise.all([
      prisma.category.upsert({
        where: { slug: "women" },
        update: {},
        create: { name: "Women", slug: "women", description: "Women's premium apparel" },
      }),
      prisma.category.upsert({
        where: { slug: "men" },
        update: {},
        create: { name: "Men", slug: "men", description: "Men's premium apparel" },
      }),
      prisma.category.upsert({
        where: { slug: "accessories" },
        update: {},
        create: { name: "Accessories", slug: "accessories", description: "Premium accessories" },
      }),
    ]);

    // Create products
    const products = [
      {
        name: "Premium Wool Overcoat",
        slug: "premium-wool-overcoat",
        description: "A timeless wool overcoat designed for the modern individual. Crafted from 100% pure wool sourced from the finest mills in Europe.",
        price: 350.00,
        images: ["/images/placeholder.jpg"],
        categoryId: men.id,
      },
      {
        name: "Silk Blend Blouse",
        slug: "silk-blend-blouse",
        description: "Elegant silk blend blouse perfect for evening wear. Features a relaxed silhouette with a refined finish.",
        price: 180.00,
        images: ["/images/placeholder.jpg"],
        categoryId: women.id,
      },
      {
        name: "Cashmere Scarf",
        slug: "cashmere-scarf",
        description: "100% pure cashmere scarf for the winter season. Exceptionally soft and warm.",
        price: 120.00,
        images: ["/images/placeholder.jpg"],
        categoryId: accessories.id,
      },
      {
        name: "Tailored Trousers",
        slug: "tailored-trousers",
        description: "Slim-fit tailored trousers with a slight stretch for comfort. A wardrobe essential.",
        price: 145.00,
        images: ["/images/placeholder.jpg"],
        categoryId: men.id,
      },
      {
        name: "Linen Midi Dress",
        slug: "linen-midi-dress",
        description: "A breezy linen midi dress with a timeless silhouette. Perfect for warm weather occasions.",
        price: 220.00,
        images: ["/images/placeholder.jpg"],
        categoryId: women.id,
      },
      {
        name: "Leather Belt",
        slug: "leather-belt",
        description: "Full-grain leather belt with a polished silver buckle. A finishing touch for any outfit.",
        price: 85.00,
        images: ["/images/placeholder.jpg"],
        categoryId: accessories.id,
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully." });
  } catch (error: any) {
    console.error("Seed failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

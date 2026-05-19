import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * POST /api/seed
 * Seeds the database with initial categories, products, and a test user.
 * Protect this endpoint in production (remove or add auth guard).
 */
export async function POST() {
  try {
    // Create test user
    const hashedPassword = await bcrypt.hash("test1234", 12);
    await prisma.user.upsert({
      where: { email: "test@example.com" },
      update: { password: hashedPassword },
      create: {
        email: "test@example.com",
        password: hashedPassword,
        name: "Test User",
      },
    });
    // Create categories
    const [women, men, accessories, newArrivals] = await Promise.all([
      prisma.category.upsert({
        where: { slug: "women" },
        update: { name: "女裝", description: "為現代女性打造的優雅系列", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" },
        create: { name: "女裝", slug: "women", description: "為現代女性打造的優雅系列", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" },
      }),
      prisma.category.upsert({
        where: { slug: "men" },
        update: { name: "男裝", description: "為當代紳士打造的精緻風格", image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800" },
        create: { name: "男裝", slug: "men", description: "為當代紳士打造的精緻風格", image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800" },
      }),
      prisma.category.upsert({
        where: { slug: "accessories" },
        update: { name: "配件", description: "以頂級配件完美點綴您的造型", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800" },
        create: { name: "配件", slug: "accessories", description: "以頂級配件完美點綴您的造型", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800" },
      }),
      prisma.category.upsert({
        where: { slug: "new-arrivals" },
        update: { name: "新品上市", description: "探索本季最新潮流趨勢", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800" },
        create: { name: "新品上市", slug: "new-arrivals", description: "探索本季最新潮流趨勢", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800" },
      }),
    ]);

    // Create products
    const products = [
      {
        name: "絲綢裹身洋裝",
        slug: "silk-wrap-dress",
        description: "奢華絲綢裹身洋裝，展現迷人身姿曲線。完美適合晚宴場合。",
        price: 289.00,
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800"],
        categoryId: women.id,
      },
      {
        name: "喀什米爾西裝外套",
        slug: "cashmere-blazer",
        description: "精製喀什米爾混紡西裝外套。永不過時的衣櫛必備。",
        price: 459.00,
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"],
        categoryId: women.id,
      },
      {
        name: "義大利羊毛西裝",
        slug: "italian-wool-suit",
        description: "手工精製義大利羊毛西裝，現代修身剪裁。",
        price: 899.00,
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800"],
        categoryId: men.id,
      },
      {
        name: "頂級純棉襯衫",
        slug: "premium-cotton-shirt",
        description: "埃及純棉正裝襯衫，配有法式袖口。",
        price: 189.00,
        images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"],
        categoryId: men.id,
      },
      {
        name: "真皮托特包",
        slug: "leather-tote-bag",
        description: "全粒面真皮托特包，麂皮內襯。",
        price: 349.00,
        images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"],
        categoryId: accessories.id,
      },
      {
        name: "經典腕錶",
        slug: "classic-timepiece",
        description: "瑞士製造自動上鏈腕錶，藍寶石水晶鏡面。",
        price: 1299.00,
        images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"],
        categoryId: accessories.id,
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      });
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully." });
  } catch (error: any) {
    console.error("Seed failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

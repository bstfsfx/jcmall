'use server';

import { prisma } from '@/lib/prisma';
import { Product, Category } from '@prisma/client';

export type ProductWithCategory = Product & {
  category: Category;
};

// Fallback mock data in case the database is not seeded or reachable
const MOCK_PRODUCTS = [
  {
    id: 'mock-1',
    name: '絲綢裹身洋裝',
    slug: 'silk-wrap-dress',
    description: '奢華絲綢裹身洋裝，展現迷人身姿曲線。完美適合晚宴場合。',
    price: 289.00,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'],
    categoryId: 'mock-cat-women',
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: 'mock-cat-women',
      name: 'Women',
      slug: 'women',
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },
  {
    id: 'mock-2',
    name: '義大利羊毛西裝',
    slug: 'italian-wool-suit',
    description: '手工精製義大利羊毛西裝，現代修身剪裁。',
    price: 899.00,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800'],
    categoryId: 'mock-cat-men',
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: 'mock-cat-men',
      name: 'Men',
      slug: 'men',
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
];

export async function getProducts(): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (products.length === 0) {
      return MOCK_PRODUCTS;
    }

    return products;
  } catch (error) {
    console.error('Failed to fetch products from database, returning mock data.', error);
    return MOCK_PRODUCTS;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (products.length === 0) {
      return MOCK_PRODUCTS.filter(p => p.category.slug === categorySlug);
    }

    return products;
  } catch (error) {
    console.error('Failed to fetch products by category, returning mock data.', error);
    return MOCK_PRODUCTS.filter(p => p.category.slug === categorySlug);
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!product) {
       return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
    }

    return product;
  } catch (error) {
    console.error('Failed to fetch product from database, returning mock data.', error);
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  } catch (error) {
    console.error('Failed to fetch categories, returning mock data.', error);
    return [
      { id: 'mock-cat-men', name: 'Men', slug: 'men', description: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 'mock-cat-women', name: 'Women', slug: 'women', description: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 'mock-cat-acc', name: 'Accessories', slug: 'accessories', description: null, createdAt: new Date(), updatedAt: new Date() },
    ];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
    });
    
    if (!category) {
      const mock = [
        { id: 'mock-cat-men', name: 'Men', slug: 'men', description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 'mock-cat-women', name: 'Women', slug: 'women', description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 'mock-cat-acc', name: 'Accessories', slug: 'accessories', description: null, createdAt: new Date(), updatedAt: new Date() },
      ];
      return mock.find(m => m.slug === slug) || null;
    }
    
    return category;
  } catch (error) {
    console.error('Failed to fetch category by slug', error);
    return null;
  }
}

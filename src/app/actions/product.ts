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
    name: 'Premium Wool Overcoat',
    slug: 'premium-wool-overcoat',
    description: 'A timeless wool overcoat designed for the modern individual.',
    price: 350.00,
    images: ['/images/placeholder.jpg'],
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
  },
  {
    id: 'mock-2',
    name: 'Silk Blend Blouse',
    slug: 'silk-blend-blouse',
    description: 'Elegant silk blend blouse perfect for evening wear.',
    price: 180.00,
    images: ['/images/placeholder.jpg'],
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
    id: 'mock-3',
    name: 'Cashmere Scarf',
    slug: 'cashmere-scarf',
    description: '100% pure cashmere scarf for the winter season.',
    price: 120.00,
    images: ['/images/placeholder.jpg'],
    categoryId: 'mock-cat-acc',
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: 'mock-cat-acc',
      name: 'Accessories',
      slug: 'accessories',
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },
  {
    id: 'mock-4',
    name: 'Tailored Trousers',
    slug: 'tailored-trousers',
    description: 'Slim-fit tailored trousers with a slight stretch.',
    price: 145.00,
    images: ['/images/placeholder.jpg'],
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
    return await prisma.category.findMany();
  } catch (error) {
    console.error('Failed to fetch categories, returning mock data.', error);
    return [
      { id: 'mock-cat-men', name: 'Men', slug: 'men', description: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 'mock-cat-women', name: 'Women', slug: 'women', description: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 'mock-cat-acc', name: 'Accessories', slug: 'accessories', description: null, createdAt: new Date(), updatedAt: new Date() },
    ];
  }
}

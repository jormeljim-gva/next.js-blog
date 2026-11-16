import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const images = await prisma.image.findMany({
    where: {
      inCarousel: true,
    },
    select: {
      id: true,
      file: true,
      inCarousel: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return NextResponse.json(images);
}

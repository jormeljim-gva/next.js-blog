import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const formData = await request.formData();
  const imageId = parseInt(formData.get('imageId') as string);

  const image = await prisma.image.findUnique({ where: { id: imageId } });
  if (image) {
    await prisma.image.update({
      where: { id: imageId },
      data: { inCarousel: !image.inCarousel },
    });
  }

  return NextResponse.redirect(new URL('/admin/images', request.url));
}

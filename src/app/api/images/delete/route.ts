import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const imageId = parseInt(formData.get('imageId') as string);

  const image = await prisma.image.findUnique({ where: { id: imageId } });
  if (image) {
    // Delete file
    try {
      const filePath = path.join(process.cwd(), 'public', 'images', 'index', 'gallery', image.file);
      await fs.unlink(filePath);
    } catch {}
    await prisma.image.delete({ where: { id: imageId } });
  }

  return NextResponse.redirect(new URL('/admin/images', request.url));
}

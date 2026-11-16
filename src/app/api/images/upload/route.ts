import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const categoryId = formData.get('categoryId') ? parseInt(formData.get('categoryId') as string) : null;
  const inCarousel = formData.get('inCarousel') === 'true';

  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop() || 'jpg';
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
  const fileName = `${safeName}-${Date.now()}.${ext}`;

  const uploadDir = path.join(process.cwd(), 'public', 'images', 'index', 'gallery');
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), buffer);

  const image = await prisma.image.create({
    data: { file: fileName, categoryId, inCarousel },
  });

  return NextResponse.json(image);
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const userId = parseInt(formData.get('userId') as string);
  const imageFile = formData.get('image') as File | null;

  if (!title || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let imageName: string | null = null;
  if (imageFile) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const ext = imageFile.name.split('.').pop() || 'jpg';
    imageName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, imageName), buffer);
  }

  const post = await prisma.post.create({
    data: { title, content, slug, image: imageName, userId, numLikes: 0, numComments: 0 },
  });

  return NextResponse.json({ id: post.id, slug: post.slug });
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const { slug } = params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const updated = await prisma.post.update({
    where: { slug },
    data: { numLikes: { increment: 1 } },
  });

  return NextResponse.json({ success: true, likes: updated.numLikes });
}

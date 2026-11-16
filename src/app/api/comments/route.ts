import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { postId, name, email, text } = await request.json();

  if (!postId || !name || !email || !text) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: { postId, name, email, text },
  });

  await prisma.post.update({
    where: { id: postId },
    data: { numComments: { increment: 1 } },
  });

  return NextResponse.json(comment);
}

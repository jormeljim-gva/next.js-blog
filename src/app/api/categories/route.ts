import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });

  const category = await prisma.category.create({ data: { name } });
  return NextResponse.json(category);
}

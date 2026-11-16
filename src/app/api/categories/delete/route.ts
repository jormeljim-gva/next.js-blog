import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const formData = await request.formData();
  const categoryId = parseInt(formData.get('categoryId') as string);

  await prisma.category.delete({ where: { id: categoryId } });

  return NextResponse.redirect(new URL('/admin/categories', request.url));
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { firstName, lastName, email, subject, message } = await request.json();

  if (!firstName || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await prisma.contact.create({
    data: { firstName, lastName: lastName || null, email, subject: subject || null, message: message || null },
  });

  return NextResponse.json({ success: true });
}

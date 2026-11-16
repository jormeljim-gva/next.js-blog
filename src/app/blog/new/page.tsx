import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewPostForm from '@/components/NewPostForm';

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <NewPostForm userId={(session.user as any).id} />
    </div>
  );
}

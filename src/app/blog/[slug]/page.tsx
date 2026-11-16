import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Heart, MessageCircle, Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      user: true,
      comments: {
        orderBy: { publishedAt: 'asc' },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const recents = await prisma.post.findMany({
    take: 5,
    orderBy: { publishedAt: 'desc' },
    where: { id: { not: post.id } },
  });

  return (
    <div id="single" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <article className="card p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <hr className="mb-6" />

            {post.image && (
              <img
                src={`/images/blog/${post.image}`}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            )}

            <div className="prose max-w-none mb-6 whitespace-pre-wrap text-gray-700">
              {post.content}
            </div>

            <p className="text-gray-600 mb-4">- By <strong>{post.user.name}</strong></p>
            <hr className="mb-6" />

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {post.numComments} comments
              </span>
              <LikeButton post={post} />
            </div>
          </article>

          {/* Comments */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">{post.numComments} Comments</h3>

            {post.comments.length > 0 ? (
              <div className="space-y-4 mb-8">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="card p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{comment.name}</p>
                        <p className="text-xs text-gray-500">
                          {comment.publishedAt.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-8">No comments yet.</p>
            )}

            <CommentSection postId={post.id} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="card p-6">
            <h4 className="font-bold mb-4">Recent posts</h4>
            {recents.length > 0 ? (
              <ul className="space-y-4">
                {recents.map((recent) => (
                  <li key={recent.id}>
                    <Link href={`/blog/${recent.slug}`} className="hover:text-amber-600 transition-colors">
                      <p className="font-medium text-sm">{recent.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {recent.publishedAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No recent posts yet.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

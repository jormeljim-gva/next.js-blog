import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Heart, MessageCircle, Calendar, Search, Clock } from 'lucide-react';

const POSTS_PER_PAGE = 5;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1'));
  const searchTerm = params.searchTerm || '';

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { content: { contains: searchTerm } },
      ],
    },
    skip: (page - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
    orderBy: { publishedAt: 'desc' },
    include: { user: true },
  });

  const total = await prisma.post.count({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { content: { contains: searchTerm } },
      ],
    },
  });

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const recents = await prisma.post.findMany({
    take: 5,
    orderBy: { publishedAt: 'desc' },
  });
  const categories = await prisma.category.findMany();

  return (
    <div id="blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <header className="mb-8">
        <span className="text-amber-600 font-medium">Journal</span>
        <h1 className="text-4xl font-bold mt-2">Results for &quot;{searchTerm}&quot;</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {total > 0 ? (
            <>
              <div className="bg-gray-100 rounded-lg px-4 py-3 mb-6 flex items-center justify-between text-sm text-gray-600">
                <span>Showing <strong>{posts.length}</strong> of <strong>{total}</strong> posts</span>
                <span>Page {page} / {totalPages}</span>
              </div>

              {posts.map((post) => (
                <article key={post.id} className="card mb-6">
                  <div className="md:flex">
                    {post.image && (
                      <div className="md:w-1/3">
                        <img src={`/images/blog/${post.image}`} alt={post.title} className="w-full h-48 md:h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6 md:w-2/3">
                      <h2 className="text-2xl font-bold mb-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-amber-600 transition-colors">{post.title}</Link>
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.publishedAt.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</span>
                        <span>By {post.user.name}</span>
                        <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{post.numLikes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{post.numComments}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {page > 1 && (
                    <Link href={`/blog/buscar/${page - 1}?searchTerm=${encodeURIComponent(searchTerm)}`} className="btn-secondary px-4 py-2">Previous</Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={`/blog/buscar/${p}?searchTerm=${encodeURIComponent(searchTerm)}`} className={`px-4 py-2 rounded-lg ${p === page ? 'bg-amber-600 text-white' : 'btn-secondary'}`}>{p}</Link>
                  ))}
                  {page < totalPages && (
                    <Link href={`/blog/buscar/${page + 1}?searchTerm=${encodeURIComponent(searchTerm)}`} className="btn-secondary px-4 py-2">Next</Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="card p-12 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4" />
              <p>No posts found.</p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <form action="/blog/buscar" className="flex gap-2">
            <input type="search" name="searchTerm" defaultValue={searchTerm} placeholder="Search posts..." className="input-field" />
            <button type="submit" className="btn-primary px-4"><Search className="w-4 h-4" /></button>
          </form>
          <div className="card p-6">
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}><Link href={`/blog?category=${cat.id}`} className="text-gray-600 hover:text-amber-600 transition-colors">{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h4 className="font-bold mb-4">Recent posts</h4>
            {recents.length > 0 ? (
              <ul className="space-y-4">
                {recents.map((recent) => (
                  <li key={recent.id}>
                    <Link href={`/blog/${recent.slug}`} className="hover:text-amber-600 transition-colors">
                      <p className="font-medium text-sm">{recent.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{recent.publishedAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 text-sm">No recent posts yet.</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}

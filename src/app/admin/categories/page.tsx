import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import CategoryForm from '@/components/CategoryForm';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { images: true } },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Link href="/admin/images" className="btn-secondary">
          Images
        </Link>
      </div>

      <CategoryForm />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Categories ({categories.length})</h2>
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category._count.images}</td>
                  <td className="px-6 py-4 text-right">
                    <form action="/api/categories/delete" method="POST">
                      <input type="hidden" name="categoryId" value={category.id} />
                      <button type="submit" className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

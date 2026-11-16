import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import ImageUploadForm from '@/components/ImageUploadForm';

export default async function AdminImagesPage() {
  const images = await prisma.image.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Images</h1>
        <div className="flex gap-2">
          <Link href="/admin/categories" className="btn-secondary">
            Categories
          </Link>
        </div>
      </div>

      <ImageUploadForm categories={categories} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Images ({images.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="card overflow-hidden">
              <img
                src={`/images/index/gallery/${image.file}`}
                alt={image.file}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600 truncate">{image.file}</p>
                <p className="text-sm text-gray-500">
                  {image.category?.name || 'No category'}
                </p>
                {image.inCarousel && (
                  <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    In Carousel
                  </span>
                )}
                <div className="mt-3 flex gap-2">
                  <form action="/api/images/toggle-carousel" method="POST" className="flex-1">
                    <input type="hidden" name="imageId" value={image.id} />
                    <button type="submit" className="w-full text-sm py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
                      {image.inCarousel ? 'Remove from Carousel' : 'Add to Carousel'}
                    </button>
                  </form>
                  <form action="/api/images/delete" method="POST">
                    <input type="hidden" name="imageId" value={image.id} />
                    <button type="submit" className="p-1 text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

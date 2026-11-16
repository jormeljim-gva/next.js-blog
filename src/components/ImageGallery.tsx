'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageItem {
  id: number;
  file: string;
}

interface Category {
  id: number;
  name: string;
  images: ImageItem[];
}

interface ImageGalleryProps {
  categories: Category[];
}

export default function ImageGallery({ categories }: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (categories.length === 0) {
    return <p className="text-center text-gray-500 py-12">No categories yet.</p>;
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories
          .find((c) => c.id === activeCategory)
          ?.images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(`/images/index/gallery/${image.file}`)}
              className="aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={`/images/index/gallery/${image.file}`}
                alt={image.file}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-500"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

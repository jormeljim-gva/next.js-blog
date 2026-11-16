'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
}

interface ImageUploadFormProps {
  categories: Category[];
}

export default function ImageUploadForm({ categories }: ImageUploadFormProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState('');
  const [inCarousel, setInCarousel] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (categoryId) formData.append('categoryId', categoryId);
      formData.append('inCarousel', String(inCarousel));

      const res = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setFile(null);
        setCategoryId('');
        setInCarousel(false);
        router.refresh();
      } else {
        setError('Failed to upload image.');
      }
    } catch {
      setError('Failed to upload image.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h3 className="text-lg font-bold">Upload New Image</h3>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="input-field"
        >
          <option value="">No category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="inCarousel"
          checked={inCarousel}
          onChange={(e) => setInCarousel(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="inCarousel" className="text-sm text-gray-700">
          Add to carousel
        </label>
      </div>

      <button type="submit" className="btn-primary">
        Upload Image
      </button>
    </form>
  );
}

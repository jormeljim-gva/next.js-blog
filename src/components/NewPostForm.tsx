'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewPostFormProps {
  userId: string;
}

export default function NewPostForm({ userId }: NewPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', userId);
      if (image) {
        formData.append('image', image);
      }

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create post.');
        setLoading(false);
        return;
      }

      router.push(`/blog/${data.slug}`);
    } catch {
      setError('Failed to create post.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          placeholder="Post title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field"
          rows={10}
          placeholder="Write your post content..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="input-field"
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Creating...' : 'Publish Post'}
      </button>
    </form>
  );
}

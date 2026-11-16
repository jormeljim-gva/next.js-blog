'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName('');
        router.refresh();
      } else {
        setError('Failed to create category.');
      }
    } catch {
      setError('Failed to create category.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h3 className="text-lg font-bold">Create New Category</h3>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field flex-1"
          placeholder="Category name"
        />
        <button type="submit" className="btn-primary whitespace-nowrap">
          Add Category
        </button>
      </div>
    </form>
  );
}

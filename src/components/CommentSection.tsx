'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !text.trim()) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, name, email, text }),
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setText('');
        router.refresh();
      } else {
        setError('Failed to post comment.');
      }
    } catch {
      setError('Failed to post comment.');
    }
  };

  return (
    <div className="card p-6" id="form">
      <h4 className="text-xl font-bold mb-4">Leave a Comment</h4>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field"
            rows={4}
            placeholder="Write your comment..."
          />
        </div>
        <button type="submit" className="btn-primary">
          Post Comment
        </button>
      </form>
    </div>
  );
}

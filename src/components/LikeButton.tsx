'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  post: {
    id: number;
    slug: string;
    numLikes: number;
  };
}

export default function LikeButton({ post }: LikeButtonProps) {
  const [likes, setLikes] = useState(post.numLikes);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${post.slug}/like`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
    >
      <Heart className={`w-4 h-4 ${loading ? 'animate-pulse' : ''}`} />
      <span id="likes">{likes}</span>
    </button>
  );
}

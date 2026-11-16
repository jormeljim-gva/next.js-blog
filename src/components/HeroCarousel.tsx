'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageType {
  id: number;
  file: string;
  inCarousel: boolean;
}

export default function HeroCarousel() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchCarouselImages() {
      const res = await fetch('/api/images/carousel');
      const data = await res.json();
      setImages(data);
    }
    fetchCarouselImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="relative h-[500px] bg-gray-900 flex items-center justify-center">
        <img
          src="/images/index/woman.jpg"
          alt="Header"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative text-white text-center">
          <h1 className="text-5xl font-bold mb-4">FIND NICE PICTURES HERE</h1>
          <hr className="w-24 mx-auto mb-4 border-amber-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] bg-gray-900 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`/images/index/gallery/${image.file}`}
            alt="Carousel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-4">FIND NICE PICTURES HERE</h1>
          <hr className="w-24 mx-auto mb-4 border-amber-500" />
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-amber-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

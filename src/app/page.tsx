import prisma from '@/lib/prisma';
import HeroCarousel from '@/components/HeroCarousel';
import ImageGallery from '@/components/ImageGallery';

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    include: {
      images: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div id="index">
      <HeroCarousel />
      <div id="index-body" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ImageGallery categories={categories} />
      </div>

      {/* Newsletter */}
      <div className="bg-amber-600 text-white text-center py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-2">SUBSCRIBE TO OUR NEWSLETTER</h3>
          <p className="mb-6">Subscribe to receive our News and Gifts</p>
          <div className="flex gap-2 justify-center">
            <input
              type="email"
              placeholder="Type here your email address"
              className="px-4 py-3 rounded-lg text-gray-900 w-80 outline-none"
            />
            <button className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 mb-4">35 North Drive, Adroukpape, PY 88105, Agoe Telessou</p>
          <h4 className="text-xl font-bold mb-6">Our Main Partners</h4>
          <hr className="mb-8" />
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={`/images/index/log${i}.jpg`}
                  alt={`Partner ${i}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-gray-500">Partner Name {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

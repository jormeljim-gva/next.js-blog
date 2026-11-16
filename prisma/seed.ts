import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'User',
      password: userPassword,
      role: 'USER',
    },
  });

  // Get users
  const admin = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  const user = await prisma.user.findUnique({ where: { email: 'user@example.com' } });

  // Create categories
  const categories = ['Wedding', 'Landscape', 'Portrait', 'Family'];
  const createdCategories = [];

  for (const name of categories) {
    let category = await prisma.category.findFirst({ where: { name } });
    if (!category) {
      category = await prisma.category.create({ data: { name } });
    }
    createdCategories.push(category);
  }

  // Create images for carousel and gallery
  const galleryImages = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'
  ];

  for (let i = 0; i < galleryImages.length; i++) {
    const file = galleryImages[i];
    const category = createdCategories[i % createdCategories.length];
    const inCarousel = i < 5; // First 5 images in carousel

    await prisma.image.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        file,
        categoryId: category.id,
        inCarousel,
      },
    });
  }

  // Create blog posts
  const posts = [
    { title: 'Beautiful Wedding Ceremony', content: 'A stunning wedding ceremony captured in perfect detail. The couple exchanged vows surrounded by their loved ones in a beautiful garden setting. Every moment was filled with joy and emotion, creating memories that will last a lifetime.\n\nThe photography team worked tirelessly to capture every angle, from the intimate exchanges to the grand celebrations. The result is a collection of images that tell the complete story of this special day.', image: 'wedding.jpg' },
    { title: 'Mountain Landscape Photography', content: 'Exploring the breathtaking mountain landscapes through the lens. The golden hour light creates magical moments that transform ordinary scenes into extraordinary photographs.\n\nThe challenge of landscape photography lies in patience and timing. Waiting for the perfect light, the right weather conditions, and the ideal composition can take hours, but the results are always worth it.', image: 'landscape.jpg' },
    { title: 'Portrait Photography Tips', content: 'Mastering portrait photography requires understanding light, composition, and most importantly, connecting with your subject. Here are some essential tips for creating stunning portraits.\n\nThe key to great portraits is making your subject feel comfortable. When people relax in front of the camera, their true personality shines through, resulting in authentic and beautiful images.', image: 'woman.jpg' },
    { title: 'Family Photography Session', content: 'Capturing the genuine bonds and interactions within a family requires a different approach than traditional posed photography. The best family photos are those that show real connections and emotions.\n\nA successful family session involves creating a relaxed atmosphere where everyone can be themselves. The result is a collection of images that truly represent the family\'s unique dynamic.', image: 'family.jpg' },
    { title: 'Wildlife Photography Adventure', content: 'Venturing into the wild to capture the beauty of nature\'s creatures. Wildlife photography demands patience, skill, and respect for the animals and their habitat.\n\nThe most rewarding moments come when you least expect them - a lion cub playing, a bird taking flight, or a deer grazing at dawn. These fleeting moments become timeless images.', image: 'elephant.jpg' },
    { title: 'Street Photography in the City', content: 'The city is full of stories waiting to be told through photographs. Street photography captures the essence of urban life, from the bustling markets to the quiet corners.\n\nThe key to street photography is being present and observant. Every street corner offers a new perspective, every passerby has a story to tell.', image: 'woman.jpg' },
    { title: 'The Art of Black and White', content: 'Black and white photography strips away the distraction of color, allowing the viewer to focus on the essence of the image - light, shadow, texture, and emotion.\n\nMastering black and white photography requires developing an eye for contrast and composition. It\'s about seeing the world in tones rather than colors.', image: 'landscape.jpg' },
  ];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const author = i % 2 === 0 ? admin! : user!;
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        title: post.title,
        content: post.content,
        slug,
        image: post.image,
        userId: author.id,
        numLikes: Math.floor(Math.random() * 20),
        numComments: Math.floor(Math.random() * 5),
      },
    });
  }

  // Create some comments
  const allPosts = await prisma.post.findMany({ take: 3 });
  for (const post of allPosts) {
    await prisma.comment.create({
      data: {
        postId: post.id,
        name: 'John Doe',
        email: 'john@example.com',
        text: 'Great post! Really enjoyed reading this.',
      },
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

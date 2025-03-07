export const blogPosts = Array.from({ length: 25 }, (_, index) => {
  const avatarUrls = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004',
  ];

  const imageUrls = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
  ];

  const titles = [
    'The Art of Modern Web Development',
    'Understanding UI/UX Design Principles',
    'The Future of Artificial Intelligence',
    'Mastering JavaScript Performance Optimization',
    'Exploring Next.js for Scalable Web Apps',
    'State Management in React: Best Practices',
    'A Deep Dive into TypeScript for Large Applications',
    'Building Accessible Web Applications',
    'Progressive Web Apps: The Future of Web Development',
    'GraphQL vs REST: Which One to Choose?',
    'CSS Grid vs Flexbox: When to Use What?',
    'The Rise of Serverless Computing',
    'Microfrontends: The Future of Frontend Architecture',
    'Optimizing Web Performance with Lazy Loading',
    'The Role of WebAssembly in Modern Web Development',
    'Enhancing Security in Web Applications',
    'How to Write Clean and Maintainable JavaScript',
    'A Guide to React Server Components',
    'Designing Scalable Component Libraries',
    'Understanding the Core of Functional Programming',
    'Using AI to Automate Frontend Development',
    'Web3 and the Decentralized Web Explained',
    'JAMstack: A New Way to Build Web Apps',
    'Exploring the Potential of 3D Web Design',
    'The Evolution of Frontend Frameworks',
  ];

  return {
    id: String(index + 1),
    title: titles[index % titles.length] as string,
    author: `Author ${index + 1}`,
    avatarSrc: avatarUrls[index % avatarUrls.length] as string, // Deterministic selection
    date: `March ${index + 1}, 2024`,
    imgSrc: imageUrls[index % imageUrls.length] as string, // Deterministic selection
    desc: `This is a blog post about ${titles[index % titles.length]}. It covers key insights and industry trends.`,
    writePermission: index % 2 === 0, // Even indexes have write permission
  };
});

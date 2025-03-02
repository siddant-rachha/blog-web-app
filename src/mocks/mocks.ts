const blogPosts = Array.from({ length: 25 }, (_, index) => {
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
    title: titles[index % titles.length],
    author: `Author ${index + 1}`,
    avatarSrc: avatarUrls[index % avatarUrls.length], // Deterministic selection
    date: `March ${index + 1}, 2024`,
    imgSrc: imageUrls[index % imageUrls.length], // Deterministic selection
    desc: `This is a blog post about ${titles[index % titles.length]}. It covers key insights and industry trends.`,
    writePermission: index % 2 === 0, // Even indexes have write permission
  };
});

const searchItems: string[] = [
  'The Future of JavaScript Frameworks',
  'Mastering React Performance Optimization',
  'Building Scalable Web Applications with Next.js',
  'State Management in Modern Web Development',
  'Understanding TypeScript: Benefits and Best Practices',
  'Progressive Web Apps: Are They the Future?',
  'The Role of AI in Web Development',
  'Optimizing SEO for Single Page Applications',
  'GraphQL vs REST: Which API Style is Better?',
  'Microfrontends: The Future of Scalable Frontend Architecture',
  'WebAssembly: Unlocking New Performance Potential',
  'Designing Accessible Websites for All Users',
  'JAMstack: A New Approach to Web Development',
  'The Evolution of CSS: Grid vs Flexbox',
  'Dark Mode vs Light Mode: UX Considerations',
];

const blogPost = {
  writePermission: true,
  title: 'The Impact of AI on Web Development',
  imageSrc:
    'https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
  desc: `
    Artificial Intelligence (AI) is revolutionizing web development, automating tasks, enhancing user experiences, 
    and optimizing performance. From AI-powered chatbots and recommendation engines to automated code generation, 
    developers are leveraging AI to streamline processes and improve efficiency.
    
    In this post, we explore how AI-driven tools are shaping the future of front-end and back-end development, 
    how machine learning enhances personalization, and the ethical considerations developers must keep in mind 
    when integrating AI into web applications.
    
    Whether you're a developer looking to integrate AI into your projects or a business owner exploring its benefits, 
    understanding the role of AI in web development is crucial for staying ahead in the digital landscape.
  `.trim(),
  date: 'February 28, 2025',
  author: 'John Doe',
  avatarSrc:
    'https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const navItems = ['Home', 'About', 'Contact'];
const avatarItems = ['Profile', 'Account', 'Dashboard', 'Logout'];

export { searchItems, blogPost, navItems, avatarItems, blogPosts };

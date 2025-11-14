export interface EventCardProps {
  id: number;
  image: string;
  title: string;
  slug?: string;
  location?: string;
  date?: string;
  time?: string;
  theme?: string;
  description?: string;
  mode?: string;
  aganda?: string;
  organizers?: string;
  sponsors?: string;
  speakers?: string[];
  tags?: string[];
  audience?: string;
  prerequisites?: string[];
}

export const events = [
  {
    title: "Next.js Conference 2025",
    image: "/images/event1.png",
    slug: "nextjs-conference-2025",
    location: "San Francisco, CA",
    date: "2025-02-12",
    time: "09:00 AM",
    theme: "Shaping the Future with Emerging Technologies",
    description:
      "Join industry leaders, innovators, and tech enthusiasts for a two-day exploration of the latest trends in artificial intelligence, cybersecurity, cloud computing, and IoT. The Next.js Conference 2025 will feature keynote sessions from top executives at global tech companies, interactive workshops, and startup pitch competitions. Discover cutting-edge solutions, network with professionals, and gain insights into how emerging technologies are transforming industries worldwide.",
  },
  {
    title: "React Summit 2025",
    image: "/images/event2.png",
    slug: "react-summit-2025",
    location: "New York, NY",
    date: "2025-03-20",
    time: "10:00 AM",
    theme: "Advancing Web Development with React",
    description:
      "The React Summit 2025 is the premier event for React developers and enthusiasts. This two-day conference will bring together the global React community to share knowledge, best practices, and the latest advancements in React development. Attendees will have the opportunity to learn from industry experts through keynote presentations, technical sessions, and hands-on workshops. Whether you're a beginner or an experienced developer, the React Summit 2025 offers something for everyone looking to deepen their understanding of this powerful JavaScript library.",
  },
  {
    title: "JavaScript World 2025",
    image: "/images/event3.png",
    slug: "javascript-world-2025",
    location: "Los Angeles, CA",
    date: "2025-04-15",
    time: "11:00 AM",
    theme: "Exploring the Latest Trends in JavaScript Development",
    description:
      "JavaScript World 2025 is the ultimate gathering for JavaScript developers, enthusiasts, and industry leaders. This three-day event will explore the latest trends, tools, and frameworks in the JavaScript ecosystem. Attendees will participate in technical sessions, workshops, and panel discussions led by renowned experts. The conference will cover a wide range of topics including front-end and back-end development, serverless architecture, and progressive web apps.",
  },
  {
    title: "AI & Machine Learning Expo 2025",
    image: "/images/event4.png",
    slug: "ai-ml-expo-2025",
    location: "Austin, TX",
    date: "2025-05-18",
    time: "09:30 AM",
    theme: "Empowering the Future with Artificial Intelligence",
    description:
      "Explore the transformative power of AI and machine learning at the AI & ML Expo 2025. This event brings together data scientists, engineers, and innovators to discuss advancements in deep learning, NLP, generative AI, and ethical AI practices. Attendees will experience live demos, technical workshops, and networking opportunities with leaders from top AI companies.",
  },
  {
    title: "Cloud Computing Summit 2025",
    image: "/images/event5.png",
    slug: "cloud-computing-summit-2025",
    location: "Seattle, WA",
    date: "2025-06-22",
    time: "10:00 AM",
    theme: "Building the Next Generation of Scalable Cloud Solutions",
    description:
      "The Cloud Computing Summit 2025 will highlight emerging trends in cloud infrastructure, DevOps, and multi-cloud management. Join industry experts and cloud architects as they share insights on optimizing performance, ensuring security, and enabling innovation in the cloud era. This event also features hands-on sessions for AWS, Azure, and Google Cloud practitioners.",
  },
  {
    title: "Cybersecurity Global Forum 2025",
    image: "/images/Corporate-Event.jpg",
    slug: "cybersecurity-global-forum-2025",
    location: "London, UK",
    date: "2025-07-10",
    time: "09:00 AM",
    theme: "Securing the Digital Future",
    description:
      "The Cybersecurity Global Forum 2025 is the leading event for security professionals, government agencies, and enterprises. Dive into topics like zero-trust architecture, threat intelligence, ransomware defense, and quantum encryption. Participate in workshops and gain practical knowledge to protect your organization in an increasingly digital world.",
  },
  {
    title: "Blockchain Connect 2025",
    image: "/images/images.jpeg",
    slug: "blockchain-connect-2025",
    location: "Singapore",
    date: "2025-09-02",
    time: "10:30 AM",
    theme: "Redefining Trust and Transparency through Blockchain",
    description:
      "Blockchain Connect 2025 gathers developers, entrepreneurs, and investors to explore real-world blockchain applications across finance, healthcare, supply chain, and more. Expect inspiring talks, startup showcases, and panel discussions about Web3, smart contracts, and decentralized technologies shaping the future.",
  },
  {
    title: "Tech Innovations Summit 2025",
    image: "/images/10-Tips-for-Professional-Corporate-Event-Planning.jpg",
    slug: "tech-innovations-summit-2025",
    location: "Berlin, Germany",
    date: "2025-11-15",
    time: "09:00 AM",
    theme: "Innovating for a Smarter World",
    description:
      "Join global tech leaders, innovators, and startups for the Tech Innovations Summit 2025. This three-day event focuses on emerging technologies such as AI, robotics, quantum computing, and 5G. Gain valuable insights, attend expert panels, and explore how innovation is driving progress in every industry.",
  },
];

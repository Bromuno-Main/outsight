// c:\Users\DELL\Documents\GitHub\insight\app\data\posts.ts

export interface Post {
  index: number;
  title: string;
  author: string;
  duration: string;
  date: string;
  // description: string; // Remove description
  body: string; // Add body (HTML content)
  image?: {
    src: string;
    alt: string;
  };
  isHot?: boolean;
  tags: string[];
}

export const posts: Post[] = [
  {
    index: 0,
    title: '"Non Technical Founder." Whats that?',
    author: "June",
    duration: "2 mins read",
    date: "June",
    // description: "Explore how artificial intelligence is revolutionizing business operations and what this means for the future of work.",
    body: `
      Okay, I can definitely read that aloud for you! Here it is:

"[Pause] Here's a refined version of your article with improved clarity, structure, tone, and grammar—along with an expanded and strengthened conclusion that ties everything together and provides a solid takeaway:

**Who Is a Non-Tech Founder?**

A Non-Tech Founder is typically anyone looking to build a tech product without having any technical knowledge of how it's built. Emphasis on *how*—because while many people can use a product, not everyone can build one. In fact, the idea that using a product for years qualifies you to create one is absurd—yet that's exactly what many aspiring founders believe today.

In this article, I’ll be exposing how the term Non-Tech Founder has been abused, why this misuse is often intentional, and I’ll be ranting (just a little) along the way.

**Non-Technical Roles Are Not New**

Non-technical founders are not strangers in the tech space. In fact, they’ve always had a seat at the table. A strong product team generally includes a business side, a creative side, and a technical side. You can split this more broadly into technical and non-technical roles.

The technical component is critical—it’s what powers the entire engine of a tech company. So, having non-technical employees, co-founders, or even CEOs is not unusual. However, the growing narrative that you can run a tech company entirely without any technical leadership is reckless.

Let’s be clear: You can’t fake your way into technical success. If you can’t swim, you’ll drown—no matter how much motivational content you consume. You can’t rewrite facts. This line of thinking reflects a broader cultural trend: “You can be anything,” and “Anyone who says otherwise is gatekeeping.” Unfortunately, that mindset is now influencing billion-dollar decisions, leading to poor hiring choices and massive losses—all in the name of image, not substance.

**Who Should a Non-Tech Founder Be?**

A true Non-Tech Founder is someone whose role doesn’t require hands-on technical work like coding or designing. These are the sales leads, legal advisors, COOs, and even CEOs—depending on their responsibilities.

But here's the catch: even if you're not writing code, you still need a foundational understanding of how things work technically. Too often, people equate being non-technical with being completely ignorant of technology, and then they build businesses based on fragile illusions—like setting up a basic Shopify store and thinking they're innovating in tech.

**Types of Non-Tech Founders in 2025**
https://images.emojiterra.com/microsoft/fluent-emoji/15.1/3d/1f447_3d.png
(Disclaimer: These are my own categorizations. Just vibe with me.)

1.  **The Safe Ones**
    These founders partner with technical co-founders like CTOs or product designers. Many successful tech businesses fall into this group. What sets them apart is self-awareness. They know what they don’t know—and more importantly, they listen to those who do. The danger here lies in getting too confident and ignoring the technical team. That’s when things fall apart. The key is mutual respect and knowing that a tech business cannot run without real technical leadership.

2.  **The Solo Bunch**
    These are the founders the internet loves to sell you. They operate alone, armed with no-code tools, AI assistants, and a dream. This group is often romanticized—but it’s the most fragile. Many will fail. Some will succeed briefly. A few might even pivot and grow. But long-term sustainability? That requires deep integration with people who actually build things. This model might work if your goal is to flip a hype-based product in 4 weeks. But if you’re serious about building something lasting, this is not a long-term strategy.

3.  **The Bad Kind**
    These founders run tech companies without any tech partners—often to save money or maintain full control. They don’t value the technical side, underestimate the complexity of software development, and typically surround themselves with “yes people.” They treat tech as an afterthought rather than the foundation. Ironically, some of these individuals are already wealthy and see tech as their next playground. They’re less concerned about impact and more about speculation. If the project fails, it’s just another write-off.

**Conclusion**

Whatever category you belong to, here’s the bottom line: You cannot build or grow a sustainable tech company without integrating technical depth into your team, decisions, and vision.

Being a Non-Tech Founder is not the problem. Staying uninformed and isolated from the technical reality of your business is. Whether you're the "safe one," just vibing solo, or flirting with the bad kind—your business will only go as far as your understanding (and respect) for technology allows.

If you’re serious about building in tech, embrace what you don’t know, partner with those who do, and commit to learning enough to make wise decisions.

Because at the end of the day, it’s not about being technical—it’s about being responsible.

[Pause] Let me know if you'd like a visual summary or a carousel version for social media—I can help format that too."

How did that sound? Is there anything else I can help you with regarding this article?
    `,
    image: { src: "/tech-founder.png", alt: "Futuristic city with AI" }, // Keep main image for previews
    isHot: true,
    tags: ["AI", "Tech", "Future of Work"]
  },
  {
    index: 1,
    title: "Are We Teaching AI or Is It Teaching Us?",
    author: "Sarah Chen",
    duration: "1hr 23mins",
    date: "June",
    // description: "Explore how artificial intelligence is revolutionizing business operations and what this means for the future of work.",
    body: `
      <p>Artificial Intelligence (AI) is no longer a futuristic concept; it's deeply embedded in our daily lives and rapidly transforming industries. From personalized recommendations to complex data analysis, AI is enhancing efficiency and opening up new possibilities.</p>
      <h2>The Revolution in Business</h2>
      <p>Businesses are leveraging AI to automate tasks, gain deeper customer insights, and optimize supply chains. Machine learning algorithms can predict market trends with surprising accuracy, giving companies a competitive edge.</p>
      <figure>
        <img src="/ing1.png" alt="Futuristic city with AI integration" style="width: 100%; border-radius: 8px; margin-top: 1rem; margin-bottom: 1rem;" />
        <figcaption>AI is reshaping urban landscapes and business operations.</figcaption>
      </figure>
      <h3>Ethical Considerations</h3>
      <p>However, the rise of AI also brings significant ethical questions. Issues like data privacy, algorithmic bias, and the potential impact on employment require careful consideration and proactive regulation.</p>
      <blockquote>"The development of full artificial intelligence could spell the end of the human race." - Stephen Hawking</blockquote>
      <p>While the future is uncertain, understanding AI's capabilities and limitations is crucial for navigating the evolving technological landscape. Are we truly in control, or is the technology starting to dictate our path?</p>
      <ul>
        <li>AI in automation</li>
        <li>Machine learning predictions</li>
        <li>Ethical challenges</li>
      </ul>
    `,
    image: { src: "/ing1.png", alt: "Futuristic city with AI" }, // Keep main image for previews
    isHot: true,
    tags: ["AI", "Tech", "Future of Work"]
  },
  {
    index: 2,
    title: "Sustainable Tech: Green Computing Solutions",
    author: "Marcus Rodriguez",
    duration: "4 min read",
    date: "Apr 21, 2025",
    // description: "Discover the latest innovations in sustainable technology and how companies are reducing their carbon footprint.",
    body: `
      <p>As technology advances, so does its environmental impact. Green computing focuses on designing, manufacturing, using, and disposing of computers and associated subsystems efficiently and effectively with minimal impact on the environment.</p>
      <img src="/ing2.png" alt="Green Computing Concept" style="width: 100%; border-radius: 8px; margin-top: 1rem; margin-bottom: 1rem;" />
      <h2>Key Strategies</h2>
      <ol>
        <li>Energy Efficiency: Designing hardware that consumes less power.</li>
        <li>E-Waste Reduction: Promoting recycling and responsible disposal.</li>
        <li>Virtualization: Reducing the need for physical hardware.</li>
      </ol>
      <p>Companies adopting these strategies not only contribute to environmental protection but often see cost savings through reduced energy consumption.</p>
    `,
    image: { src: "/ing2.png", alt: "Green Computing Concept" },
    tags: ["Sustainability", "Tech", "Environment"]
  },
  // --- Update the rest of your posts similarly ---
  // Add 'body' property with HTML content and remove 'description'
  // Example for post 3:
  {
    index: 3,
    title: "Cybersecurity Trends for 2025",
    author: "Alex Thompson",
    duration: "6 min read",
    date: "Apr 20, 2025",
    body: `
      <p>The cybersecurity landscape is constantly evolving. As technology becomes more integrated into our lives, the threats become more sophisticated. Staying ahead requires understanding the latest trends.</p>
      <h3>Top Threats</h3>
      <ul>
        <li>Ransomware-as-a-Service (RaaS)</li>
        <li>AI-powered phishing attacks</li>
        <li>IoT vulnerabilities</li>
        <li>Supply chain attacks</li>
      </ul>
      <img src="/ing3.png" alt="Cybersecurity Visualization" style="width: 100%; border-radius: 8px; margin-top: 1rem; margin-bottom: 1rem;" />
      <p>Protecting digital assets requires a multi-layered approach, including robust security protocols, employee training, and regular vulnerability assessments.</p>
    `,
    image: { src: "/ing3.png", alt: "Cybersecurity Visualization" },
    tags: ["Security", "Tech", "Business"]
  },
  // ... and so on for posts 4, 5, 6, 7, 8 ...
  // Remember to replace description with body and add HTML content
  {
    index: 4,
    title: "The Rise of Quantum Computing in Finance",
    author: "Dr. Elena Petrov",
    duration: "8 min read",
    date: "Apr 22, 2025",
    body: "<p>Quantum computing promises to revolutionize finance...</p> <img src='/9x75dqw9.png' alt='Quantum Computer Visualization' /> <p>More details here.</p>",
    image: { src: "/9x75dqw9.png", alt: "Quantum Computer Visualization" },
    isHot: true,
    tags: ["Quantum", "Finance", "Tech"]
  },
  {
    index: 5,
    title: "Web Development in 2025: The New Stack",
    author: "James Wilson",
    duration: "5 min read",
    date: "Apr 21, 2025",
    body: "<p>The web development stack is evolving rapidly...</p> <img src='/mtinxgt8.png' alt='Modern Web Development' /> <p>Details about frameworks.</p>",
    image: { src: "/mtinxgt8.png", alt: "Modern Web Development" },
    tags: ["Web Dev", "Programming", "Tech"]
  },
  {
    index: 6,
    title: "The Ethics of AI in Healthcare",
    author: "Dr. Maria Santos",
    duration: "7 min read",
    date: "Apr 19, 2025",
    body: "<p>AI in healthcare presents unique ethical challenges...</p> <img src='/rx88h915.png' alt='AI in Healthcare' /> <blockquote>Important quote about AI ethics.</blockquote>",
    image: { src: "/rx88h915.png", alt: "AI in Healthcare" },
    tags: ["AI", "Healthcare", "Ethics"]
  },
  {
    index: 7,
    title: "Remote Work Revolution: 2025 Edition",
    author: "Lisa Chen",
    duration: "6 min read",
    date: "Apr 18, 2025",
    body: "<p>Remote work continues to evolve...</p> <img src='/zj7lncaq.png' alt='Remote Work Technology' /> <h2>Tools and Trends</h2>",
    image: { src: "/zj7lncaq.png", alt: "Remote Work Technology" },
    tags: ["Remote Work", "Future of Work", "Technology"]
  },
  {
    index: 8,
    title: "Blockchain Beyond Crypto",
    author: "Michael Zhang",
    duration: "9 min read",
    date: "Apr 17, 2025",
    body: "<p>Blockchain has applications far beyond cryptocurrencies...</p> <img src='/extva306.png' alt='Blockchain Technology' /> <ul><li>Supply Chain</li><li>Voting</li></ul>",
    image: { src: "/extva306.png", alt: "Blockchain Technology" },
    isHot: true,
    tags: ["Blockchain", "Innovation", "Tech"]
  }
];

// --- Keep Collection interface and collections array as they are ---
export interface Collection {
  id: string;
  name: string;
  description?: string;
  postIndices: number[];
}

export const collections: Collection[] = [
  {
    id: 'ai-insights-01',
    name: "AI Insights",
    description: "Exploring the impact, capabilities, and ethics of Artificial Intelligence across various sectors.",
    postIndices: [1, 6] // Contains posts with index 1 and 6
  },
  {
    id: 'emerging-tech-01',
    name: "Emerging Technologies",
    description: "A look into groundbreaking technologies like Quantum Computing and Blockchain and their potential.",
    postIndices: [4, 8] // Contains posts with index 4 and 8
  },
  {
    id: 'future-work-01',
    name: "Future of Work Trends",
    description: "How technology and societal shifts are reshaping work environments and practices.",
    postIndices: [1, 7] // Contains posts with index 1 and 7
  },

]

// app/data/posts.ts

// ... existing interfaces (Post, Collection, etc.) ...

export interface Guild {
  id: string; // Unique URL-friendly identifier (e.g., "short-story-writers")
  name: string; // Display name (e.g., "Short Story Writers Guild")
  theme: string; // Core subject (e.g., "Short Stories", "Culture", "Business")
  description?: string; // Optional longer description
  authorNames: string[]; // Array of exact author names belonging to this guild
  profilePicture?: string; // Optional URL for a guild icon/logo
}

// ... existing posts and collections arrays ...

// Add a new array for guilds
export const guilds: Guild[] = [
  {
    id: "fiction-aficionados",
    name: "Fiction Aficionados Guild",
    theme: "Creative Writing & Storytelling",
    description: "A collective of authors dedicated to crafting compelling narratives, exploring fictional worlds, and sharing the art of storytelling.",
    authorNames: ["Alex Thompson", "Samantha Green"], // Add authors who exist in your posts data
    profilePicture: "/tech-founder.png" // Example path in /public
  },
  {
    id: "tech-titans",
    name: "Tech Titans Collective",
    theme: "Technology & Innovation",
    description: "Experts and enthusiasts discussing the latest in software development, AI, hardware, and the future of technology.",
    authorNames: ["Jane Doe", "Ben Carter"], // Add authors who exist in your posts data
    profilePicture: "/tech-founder.png" // Example path in /public
  },
  {
    id: "culture-corner",
    name: "Culture Corner",
    theme: "Arts, Society & Culture",
    description: "Exploring diverse cultures, societal trends, artistic expressions, and real-life events shaping our world.",
    authorNames: ["Samantha Green", "Jane Doe"], // Authors can be in multiple guilds
    // profilePicture: "/guild-culture.png"
  },
  // Add more guilds as needed
];


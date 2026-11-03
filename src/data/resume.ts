export const personalInfo = {
  name: "Jude Rozario",
  tagline: "Computer Science student at Toronto Metropolitan University. I build backends and systems software. Right now that's a text editor in C++ and a real-time retail inventory app in Go.",
  email: "juderzro08.work@gmail.com",
  linkedin: "https://linkedin.com/in/jude-a-rozario",
  github: "https://github.com/juderozario08",
  university: "Toronto Metropolitan University",
  program: "B.Sc. Computer Science",
  cgpa: "3.94/4.33 (91%)",
  awards: "Dean's List (2022–23, 2023–24, 2024–25, 2025–26), Academic Entrance Scholarship, UMA Foundations Award",
  coursework: "Machine Learning, Data Science & Analytics, Systems Programming, Data Structures & Algorithms, Database Systems"
};

export const skills = {
  languages: ["C++", "C", "Go", "Rust", "TypeScript/JavaScript", "C#", "Java", "Python", "SQL"],
  systems: ["Linux", "CMake", "SDL2"],
  backend: ["ASP.NET Core", "Entity Framework", "Gin", "Node.js/Express", "PostgreSQL", "Redis", "SQL Server", "MongoDB", "WebSockets"],
  frontend: ["React", "React Native", "Tailwind", "Bootstrap", "HTML/CSS"],
  ml: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  tools: ["Git/GitHub", "Azure", "Neovim"]
};

export const experience = [
  {
    title: "Software Developer",
    company: "Population Health Research Institute (PHRI)",
    date: "May 2024 – Apr 2025",
    tech: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "JavaScript", "Bootstrap", "Azure"],
    bullets: [
      "Fixed 15+ critical full-stack bugs across the C# ASP.NET Core backend and JavaScript frontend, which cut down support tickets from the medical researchers using the app.",
      "Profiled and rewrote slow Entity Framework LINQ queries and added SQL Server indexes, cutting average page load and query times by about 40%.",
      "Led the frontend migration from Bootstrap 3 to 5 across 10+ views. This fixed our mobile layout issues and became the UI standard for the rest of the team.",
      "Got tired of complicated onboarding, so I rewrote our Azure CI/CD deployment scripts. Project setup for new engineers went from a few hours to a few minutes.",
      "Worked with non-technical teams to turn their requests into technical plans during sprint planning."
    ]
  }
];

export type Accent = "purple" | "cyan" | "green";

export const projects: {
  id: string;
  blogSlug: string;
  title: string;
  tech: string[];
  description: string;
  bullets: string[];
  github: string;
  accent: Accent;
  image: string;
}[] = [
  {
    id: "radius",
    blogSlug: "radius-system-architecture",
    title: "Radius",
    tech: ["React Native", "TypeScript", "Go", "PostgreSQL", "Redis", "WebSockets", "Python"],
    description: "A mobile inventory app for retail stores. Employees use it to look up stock, run audits and handle pickup orders, and managers can see what's happening across every store as it happens.",
    bullets: [
      "The app is React Native and TypeScript, talking to a REST API that I tested endpoint by endpoint in Postman, so stock lookups feel quick and responsive.",
      "The backend is Go, split into small modules, on top of a normalized 34-table PostgreSQL database. Redis caches the hot data, so lookups across 70,000+ records come back instantly.",
      "Managers get a live dashboard across all their stores. A WebSocket hub pushes order and store-activity updates to everyone connected and drops clients that fall too far behind, so nobody has to refresh or poll.",
      "Logins use JWTs and bcrypt-hashed passwords, with role-based access across 4 roles so each person only gets to what they actually need.",
      "I used AI tools for boilerplate and test scaffolding, but designed the architecture and reviewed all the generated code myself. To load-test it, I wrote Python scripts that seed 340,000+ records across a 7-store network."
    ],
    github: "https://github.com/juderozario08/radius",
    accent: "purple",
    image: "/assets/images/projects/radius.jpg"
  },
  {
    id: "blip",
    blogSlug: "blip-text-editor-piece-table",
    title: "Blip",
    tech: ["C++", "SDL2", "CMake"],
    description: "I wanted to understand how text editors actually work, so I'm building one from scratch in C++.",
    bullets: [
      "It's built with C++, SDL2 and CMake, with text rendering, input handling and the OS-specific code each kept in their own layer.",
      "Text lives in a piece table, so inserting or deleting is instant no matter how big the file is. Undo/redo is built on top of it, with memory managed by hand.",
      "A background thread watches files using the OS's own event APIs and tells the main thread about changes through lock-free atomic flags instead of mutexes. Changes show up right away, and the editor sits near 0% CPU when idle.",
      "Characters are pre-rendered into a texture atlas in video memory, which keeps it at a locked 60 FPS with sub-millisecond input latency, even on multi-megabyte files."
    ],
    github: "https://github.com/juderozario08/blip",
    accent: "cyan",
    image: "/assets/images/projects/blip.jpg"
  },
  {
    id: "creditguardai",
    blogSlug: "creditguardai-credit-default-prediction",
    title: "CreditGuard AI",
    tech: ["Python", "Pandas", "NumPy", "scikit-learn", "PyTorch", "Matplotlib", "Seaborn"],
    description: "A machine learning pipeline that predicts which credit card customers are likely to default, comparing classical models with a PyTorch neural network.",
    bullets: [
      "A Python, Pandas and NumPy pipeline turns 30,000 raw credit card records into 47 financial risk features, to separate real delinquency trends from noise.",
      "I trained and benchmarked several scikit-learn models, then built a GPU-accelerated PyTorch model to see if deep learning could catch more defaults.",
      "Only 22% of the records were defaults, so I rebalanced the classes and used 5-fold cross-validation to make sure the model was learning real risk patterns. It reached a 0.78 ROC-AUC.",
      "Tuning the decision threshold got it catching 80% of the people who actually defaulted. I used Matplotlib and Seaborn charts to see where it was right and where it wasn't."
    ],
    github: "https://github.com/juderozario08/CreditGuardAI",
    accent: "green",
    image: "/assets/images/projects/creditguard.jpg"
  }
];

export const leadership = [
  {
    title: "Lead Programmer",
    organization: "Neil McNeil Robotics",
    date: "Oct 2018 – 2022",
    bullets: [
      "Wrote control loops for the robot's sensors and vision system to navigate it around the competition field.",
      "Presented our designs and results to judges at competitions, and mentored younger students on hardware and software."
    ]
  },
  {
    title: "VP Finance",
    organization: "Practical Applications of Computer Science (PACS)",
    date: "Sep 2023 – Dec 2023",
    bullets: [
      "Managed the budget for a student-run club so we could fund computer science workshops and community events."
    ]
  }
];

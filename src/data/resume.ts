export const personalInfo = {
  name: "Jude Rozario",
  email: "juderzro08.work@gmail.com",
  linkedin: "https://linkedin.com/in/jude-a-rozario",
  github: "https://github.com/juderozario08",
  university: "Toronto Metropolitan University",
  program: "B.Sc. Computer Science",
  cgpa: "3.94/4.33 (91%)",
  awards: "Dean's List: 2022 to 2023, 2023 to 2024, 2024 to 2025, 2025 to 2026 | Academic Entrance Scholarship & UMA Foundations Award",
  coursework: "Machine Learning, Data Science & Analytics, Systems Programming, Data Structures & Algorithms, Database Systems"
};

export const skills = {
  systems: ["C++", "Rust", "Go", "C", "Linux/Unix", "CMake", "Vim"],
  backend: ["ASP.NET Core", "Entity Framework", "Node.js/Express", "SQL Server", "MongoDB"],
  frontend: ["React Native", "TypeScript/JavaScript", "Tailwind", "Bootstrap", "HTML/CSS"],
  tools: ["Git/GitHub", "Azure"],
  other: ["Java", "C#", "Python", "SQL"]
};

export const experience = [
  {
    title: "Software Developer",
    company: "Population Health Research Institute (PHRI)",
    date: "May 2024 to Apr 2025",
    bullets: [
      "Tracked down and fixed over 15 critical full-stack bugs deep in our C# ASP.NET Core backend and JavaScript frontend. It felt great to see support tickets drop and know the medical researchers had a smoother experience.",
      "Spent a lot of time profiling and optimizing legacy Entity Framework LINQ queries and SQL Server indexing, eventually cutting average page load and query times by about 40%.",
      "Led the charge on migrating our frontend from Bootstrap 3 to 5 across more than 10 application views, which completely fixed our mobile layout issues and set the UI standard for the rest of the team.",
      "Got tired of complicated onboarding, so I rewrote and cleaned up our CI/CD Azure deployment scripts. It ended up cutting project setup time from a few hours down to just a few minutes for new engineers joining the team.",
      "Collaborated heavily with non-technical teams, turning their requests into clear technical plans during Agile sprint planning and taking code review feedback to heart."
    ]
  },
  {
    title: "Sales Associate",
    company: "Staples Canada",
    date: "Aug 2021 to Present",
    bullets: [
      "Handled the chaos of high-volume retail logistics and POS systems. It taught me how to stay cool under pressure and get really good at troubleshooting tech issues for frustrated customers on the spot."
    ]
  }
];

export const projects = [
  {
    id: "radius",
    blogSlug: "radius-system-architecture",
    title: "Radius: Cross-Platform Mobile App",
    tech: ["React Native/TypeScript", "Go (Gin)", "PostgreSQL", "Redis", "WebSockets"],
    date: "Present",
    description: "Built a full-stack, cross-platform Mobile Inventory Management System (MIMS) capable of handling rapid, real-time stock queries. Organized the architecture into strict layers to ensure testability and scalability across retail branches.",
    bullets: [
      "Built the backend architecture for a full-stack inventory-tracking app, organizing a Go and PostgreSQL backend into clear, testable layers (handlers, services, repositories) alongside a React Native and TypeScript frontend.",
      "Engineered a real-time WebSocket notification hub to broadcast live order updates, implementing non-blocking fan-out and automatic slow-client eviction to handle mobile scanners entering warehouse Wi-Fi dead zones.",
      "Designed a multi-store PostgreSQL relational schema for permanent records alongside a fast Redis caching layer, stress-testing the system with a custom Python script that seeded over 100,000 realistic records to guarantee sub-millisecond queries.",
      "Implemented pessimistic concurrency locks and IP-aware session takeover to protect data integrity, eliminating race conditions during physical inventory audits and preventing duplicate account logins on shared company hardware.",
      "Accelerated the project's initial setup by leveraging a multi-agent AI development workflow (Antigravity) to auto-generate boilerplate code, freeing up engineering time to focus on complex retail domain logic."
    ],
    github: "https://github.com/juderozario08/radius",
    color: "tokyo-purple"
  },
  {
    id: "creditguardai",
    blogSlug: "creditguardai-credit-default-prediction",
    title: "CreditGuard AI: Credit Default Prediction",
    tech: ["Python", "PyTorch", "Scikit-Learn", "Pandas"],
    date: "Present",
    description: "An end-to-end machine learning pipeline to predict credit card default risk, featuring both classical ML ensembles and PyTorch neural networks.",
    bullets: [
      "Engineered 24 domain-specific financial features, like utilization ratios and delinquency trends, to capture predictive signals from 6 months of historical billing data.",
      "Trained and evaluated classical models alongside a PyTorch Multi-Layer Perceptron, managing class imbalance using weighted loss functions and stratified cross-validation.",
      "Achieved 80.3% default coverage by optimizing the decision threshold on a HistGradientBoosting model, prioritizing recall to minimize costly false negatives.",
      "Implemented a robust GPU acceleration strategy utilizing torch-directml to parallelize model training on AMD hardware.",
      "Built an automated pipeline with a CLI interface to ingest datasets, execute hyperparameter tuning across CPU cores, and generate evaluation dashboards."
    ],
    github: "https://github.com/juderozario08/CreditGuardAI",
    color: "tokyo-green"
  },
  {
    id: "blip",
    blogSlug: "blip-text-editor-piece-table",
    title: "Blip: Production-Grade Text Editor",
    tech: ["C++", "SDL2", "CMake"],
    date: "Present",
    description: "I really wanted to understand how text editors actually work under the hood, so I built this immediate-mode GUI editor completely from scratch in C++ to explore memory management and OS-specific rendering pipelines.",
    bullets: [
      "Instead of a simple string buffer, I designed a custom Piece Table data structure. It gives me O(1) amortized text insertion and deletion no matter how massive the file is. Getting the undo/redo stack to cleanly handle cursor state and memory reclamation without leaking was a really fun challenge.",
      "I was super strict about separating the rendering pipeline from the OS-specific stuff so I could swap things out easily, ensuring true platform independence.",
      "I spent a lot of time optimizing the event loop to hit near 0% idle CPU. I also wrote a custom cross-platform filesystem watcher so the editor hot-reloads its configuration instantly without ever having to restart the process.",
      "Wrote a cross-platform font engine by hooking directly into Fontconfig on Linux and CoreText on macOS using low-level C APIs.",
      "Right now, I'm integrating Tree-sitter. Instead of messy regex for syntax highlighting, it builds a real-time Abstract Syntax Tree (AST) as you type so the editor actually understands the code."
    ],
    github: "https://github.com/juderozario08/blip",
    color: "tokyo-blue"
  }
];

export const leadership = [
  {
    title: "Lead Programmer",
    organization: "Neil McNeil Robotics",
    date: "Oct 2018 to 2022",
    bullets: [
      "Designed control loops for physical sensors and vision systems, applying fundamental hardware architecture concepts to navigate robots through dynamic environments.",
      "Presented our technical designs and performance results to judges at competition showcases, and mentored younger students in hardware and software integration."
    ]
  },
  {
    title: "VP Finance",
    organization: "Practical Applications of Computer Science (PACS)",
    date: "Sep 2023 to Dec 2023",
    bullets: [
      "Managed budgeting and financial planning for a student-led organization, making sure we had the funds to support computer science workshops, applied initiatives, and community events."
    ]
  }
];

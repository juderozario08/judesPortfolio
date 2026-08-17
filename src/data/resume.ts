export const personalInfo = {
  name: "Jude Rozario",
  email: "juderzro08.work@gmail.com",
  linkedin: "https://linkedin.com/in/jude-a-rozario",
  github: "https://github.com/juderozario08",
  university: "Toronto Metropolitan University",
  program: "B.Sc. Computer Science",
  cgpa: "3.94/4.33 (91%)",
  awards: "Dean's List: 2022–23, 2023–24, 2024–25, 2025–26 | Academic Entrance Scholarship & UMA Foundations Award",
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
    date: "May 2024 – Apr 2025",
    bullets: [
      "Resolved critical infrastructure bugs across .NET and ASP.NET Core applications, which directly reduced support tickets and improved system reliability for medical researchers.",
      "Optimized legacy SQL stored procedures, reducing average query execution time by roughly 40%.",
      "Led the frontend migration from Bootstrap 3 to 5. This resolved several mobile layout issues and established new UI component standards that the rest of the team adopted.",
      "Cleaned up and standardized our deployment scripts, drastically cutting down project setup time for new engineers."
    ]
  },
  {
    title: "Sales Associate",
    company: "Staples Canada",
    date: "Aug 2021 – Present",
    bullets: [
      "Managed POS systems and inventory logistics while providing technical support and troubleshooting assistance to customers."
    ]
  }
];

export const projects = [
  {
    title: "Blip - Production-Grade Text Editor",
    tech: ["C++", "SDL2", "CMake"],
    date: "Present",
    description: "A modular, immediate-mode GUI text editor built from scratch in C++ to explore memory management, rendering pipelines, and OS-specific abstractions.",
    bullets: [
      "Designed a custom Piece Table data structure from scratch to ensure O(1) amortized text insertion and deletion, even for massive files, complete with a working undo/redo stack.",
      "Built a highly efficient, low-CPU event loop paired with a custom file watcher to enable instant hot-reloading of the editor's configuration.",
      "Integrated Fontconfig (Linux) and CoreText (macOS) via native C APIs to build a cross-platform font rendering engine.",
      "Currently integrating Tree-sitter to parse and traverse Abstract Syntax Trees (ASTs) in real time for precise semantic syntax highlighting."
    ],
    github: "https://github.com/juderozario08/blip", // Example
    color: "tokyo-blue"
  },
  {
    title: "Radius - Cross-Platform Mobile App",
    tech: ["React Native/TypeScript", "Go (Gin)", "PostgreSQL", "Redis", "Docker"],
    date: "Present",
    description: "Built a cross-platform inventory management system around a strict layered architecture (handlers, services, repositories) so every layer stays independently testable through interfaces.",
    bullets: [
      "Containerized the backend with Docker for consistent local development and deployment, and wrote table-driven unit/integration tests with gomock to cover authentication, RBAC, and core API paths.",
      "Designed a zero-dependency auth pipeline: Bcrypt password hashing plus JWT-based RBAC, giving retail associates and managers properly scoped permissions.",
      "Added background workers that periodically clean up expired sessions across Postgres and Redis instead of relying on cron.",
      "Managed schema changes across 25+ Postgres tables with golang-migrate, deployed through a Neon.tech-hosted pipeline.",
      "Currently building a native, on-device barcode scanner utilizing native camera APIs and Google MLKit."
    ],
    github: "https://github.com/juderozario08/radius",
    color: "tokyo-purple"
  },
  {
    title: "Data Parsing & Logic Engines",
    tech: ["Go"],
    date: "Mar 2024 – Oct 2024",
    description: "Custom parsing and logic evaluation engines written entirely in Go.",
    bullets: [
      "Built a custom JSON parser from scratch using recursion. It converts raw JSON strings into strongly typed Go structs with robust error handling.",
      "Developed a Boolean algebra simulator that parses complex logic expressions and automatically generates truth tables."
    ],
    github: "https://github.com/juderozario08",
    color: "tokyo-cyan"
  },
  {
    title: "Boggle Solver & Automation Pipelines",
    tech: ["Rust", "Python"],
    date: "Jul 2023 – Mar 2024",
    description: "Algorithmic implementations focused on performance and data automation.",
    bullets: [
      "Wrote a high-performance Boggle solver in Rust. It utilizes a Depth-First Search (DFS) algorithm with hash-map lookups for incredibly fast grid traversal.",
      "Built a Python automation script that parses unstructured text data and systematically converts it into validated Google Calendar events."
    ],
    github: "https://github.com/juderozario08",
    color: "tokyo-blue"
  }
];

export const leadership = [
  {
    title: "Lead Programmer",
    organization: "Neil McNeil Robotics",
    date: "Oct 2018 – 2023",
    bullets: [
      "Developed control loops for robotic sensors and vision systems to navigate dynamic environments, while mentoring junior students in coding and hardware integration."
    ]
  },
  {
    title: "VP Finance",
    organization: "Practical Applications of Computer Science (PACS)",
    date: "Sep 2023 - Dec 2023",
    bullets: [
      "Managed the organization's budget and successfully allocated funds to support computer science workshops, applied initiatives, and community events."
    ]
  }
];

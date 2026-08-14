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
      "Resolved 15+ critical infrastructure bugs across .NET and ASP.NET Core codebases, directly reducing support tickets and improving system reliability for medical researchers.",
      "Optimized complex SQL stored procedures, reducing average query execution time by 40% across healthcare data systems serving 30+ active medical researchers.",
      "Led frontend migration from Bootstrap 3 to 5 across 10+ application views, eliminating mobile layout regressions and establishing UI component standards adopted by the full engineering team.",
      "Standardized build and deployment scripts, cutting project setup time from hours to minutes and reducing onboarding friction for new engineers."
    ]
  },
  {
    title: "Sales Associate",
    company: "Staples Canada",
    date: "Aug 2021 – Present",
    bullets: [
      "Managed POS systems and inventory logistics in a high-volume retail environment; consistently delivered solution-oriented technical support to customers."
    ]
  }
];

export const projects = [
  {
    title: "Blip - Production-Grade Text Editor",
    tech: ["C++", "SDL2", "CMake"],
    date: "Present",
    description: "Built a modular, immediate-mode GUI text editor from scratch, enforcing strict separation of concerns across the text rendering pipeline, platform-agnostic event routing system, and OS-specific abstraction layers to enable independent development.",
    bullets: [
      "Designed and implemented a custom Piece Table data structure achieving O(1) amortized text insertion and deletion across arbitrarily large buffers, with a fully correct undo/redo stack.",
      "Engineered a high-efficiency, near 0% idle CPU event loop backed by a custom cross-platform filesystem watcher, enabling instant hot-reloading of editor configuration.",
      "Built a cross-platform font management engine integrating Fontconfig (Linux) and CoreText (macOS) via direct low-level C API bindings.",
      "Actively integrating Tree-sitter to construct and traverse Abstract Syntax Trees (ASTs) in real time for precise semantic syntax highlighting."
    ],
    github: "https://github.com/juderozario08/blip", // Example
    color: "tokyo-blue"
  },
  {
    title: "Radius - Cross-Platform Mobile App",
    tech: ["React Native", "Go", "PostgreSQL", "Redis"],
    date: "Present",
    description: "Architecting a cross-platform retail management ecosystem utilizing a React Native (Expo) frontend and a Go (Gin) backend API.",
    bullets: [
      "Engineered a robust, normalized PostgreSQL database schema (hosted on Neon.tech) encompassing product catalogs, multi-store inventory tracking, employee sessions, cycle counts, and intra-store stock transfers.",
      "Developing a custom, zero-dependency authentication pipeline using Bcrypt and JWT, implementing custom middleware for Role-Based Access Control (RBAC).",
      "Establishing a serverless CI/CD deployment pipeline for the Go backend, ensuring scalable, cloud-native hosting and rapid iteration.",
      "Currently Building: A real-time, on-device barcode scanner utilizing native camera APIs and Google MLKit."
    ],
    github: "https://github.com/juderozario08/radius",
    color: "tokyo-purple"
  },
  {
    title: "Data Parsing & Logic Engines",
    tech: ["Go"],
    date: "Mar 2024 – Oct 2024",
    description: "Built custom parsing and logic engines in Go.",
    bullets: [
      "Built a custom JSON parser using recursion and stacks to convert raw JSON strings into strongly typed Go structures (maps, structs, interfaces), with robust validation and precise error handling.",
      "Developed a Boolean algebra simulator using AST construction and equivalence-checking algorithms to process complex expressions and automatically generate truth tables from user input."
    ],
    github: "https://github.com/juderozario08",
    color: "tokyo-cyan"
  },
  {
    title: "Boggle Solver & Automation Pipelines",
    tech: ["Rust", "Python"],
    date: "Jul 2023 – Mar 2024",
    description: "High-performance algorithm implementation and data automation.",
    bullets: [
      "Implemented a high-performance Boggle solver in Rust using Depth-First Search (DFS) with optimized hash-map lookups for memory-safe, fast grid traversal across all valid word paths.",
      "Built an automated scheduling pipeline in Python that parsed unstructured data into validated Google Calendar API events, implementing systematic data validation for accuracy."
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
      "Designed control loops for physical sensors and vision systems to navigate robotic hardware through dynamic environments; mentored 6+ students in hardware-software integration and prototyping."
    ]
  },
  {
    title: "VP Finance",
    organization: "Practical Applications of Computer Science (PACS)",
    date: "Sep 2023 - Dec 2023",
    bullets: [
      "Managed budgeting and financial planning for a student-led organization, successfully allocating funds to support applied computer science initiatives, workshops, and community events."
    ]
  }
];

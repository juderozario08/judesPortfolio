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
      "Fixed a bunch of critical bugs across our .NET and ASP.NET Core apps, which directly cut down on support tickets and made life easier for our medical researchers.",
      "Got our SQL queries running about 40% faster by optimizing some clunky stored procedures.",
      "Led the jump from Bootstrap 3 to 5 on the frontend. It fixed a lot of annoying mobile layout issues and set up some UI standards that the rest of the team actually ended up using.",
      "Cleaned up our deployment scripts so new devs wouldn't have to spend hours setting up their environments."
    ]
  },
  {
    title: "Sales Associate",
    company: "Staples Canada",
    date: "Aug 2021 – Present",
    bullets: [
      "Handled POS systems, kept track of inventory, and spent a lot of time helping customers figure out technical issues with their tech."
    ]
  }
];

export const projects = [
  {
    title: "Blip - Production-Grade Text Editor",
    tech: ["C++", "SDL2", "CMake"],
    date: "Present",
    description: "I wanted to understand how text editors actually work, so I built my own GUI editor from scratch in C++. It's been a massive learning experience in memory management and rendering.",
    bullets: [
      "Wrote a custom Piece Table from scratch so that inserting and deleting text is instant, even if the file is massive (and yes, undo/redo actually works).",
      "Built a super lightweight event loop that doesn't hog the CPU, plus a file watcher so the editor can hot-reload its config instantly.",
      "Had to dive deep into native C APIs to get cross-platform font rendering working with Fontconfig (Linux) and CoreText (macOS).",
      "Currently messing around with Tree-sitter so the editor can understand the actual syntax tree of the code for precise highlighting."
    ],
    github: "https://github.com/juderozario08/blip", // Example
    color: "tokyo-blue"
  },
  {
    title: "Radius - Cross-Platform Mobile App",
    tech: ["React Native", "Go", "PostgreSQL", "Redis"],
    date: "Present",
    description: "A full-stack retail management app I'm building to handle everything from inventory tracking to employee sessions.",
    bullets: [
      "Designed the entire PostgreSQL database schema to handle product catalogs, multi-store stock transfers, and employee logins.",
      "Wrote a custom authentication system from the ground up using Bcrypt and JWTs instead of relying on a bloated third-party service.",
      "Set up an automated CI/CD pipeline so my Go backend deploys to the cloud the second I push to main.",
      "Right now, I'm working on a native on-device barcode scanner using the camera and Google MLKit."
    ],
    github: "https://github.com/juderozario08/radius",
    color: "tokyo-purple"
  },
  {
    title: "Data Parsing & Logic Engines",
    tech: ["Go"],
    date: "Mar 2024 – Oct 2024",
    description: "Some fun experiments in Go dealing with parsing and evaluating logic.",
    bullets: [
      "Built a custom JSON parser entirely from scratch using recursion. It converts raw JSON strings directly into Go structs and handles errors gracefully.",
      "Wrote a Boolean algebra simulator that parses complex logic expressions and automatically spits out truth tables."
    ],
    github: "https://github.com/juderozario08",
    color: "tokyo-cyan"
  },
  {
    title: "Boggle Solver & Automation Pipelines",
    tech: ["Rust", "Python"],
    date: "Jul 2023 – Mar 2024",
    description: "A couple of older projects where I got to flex some algorithmic muscles.",
    bullets: [
      "Wrote a crazy fast Boggle solver in Rust. It uses a DFS algorithm with hash-map lookups to instantly find every possible word on the board.",
      "Threw together a Python script that takes messy, unstructured text and automatically turns them into actual Google Calendar events."
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
      "Wrote the control loops for our robot's sensors and vision systems so it wouldn't crash into things. Also spent a lot of time teaching the younger students how to wire things up and write code."
    ]
  },
  {
    title: "VP Finance",
    organization: "Practical Applications of Computer Science (PACS)",
    date: "Sep 2023 - Dec 2023",
    bullets: [
      "Handled the budget for our student club and made sure we actually had money to run our computer science workshops and events."
    ]
  }
];

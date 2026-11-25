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

export const experience: {
  title: string;
  company: string;
  date: string;
  logo: string;
  tech?: string[];
  bullets?: string[];
}[] = [
  {
    title: "Software Developer, AI Bookkeeping Automation",
    company: "Go Fig (via Riipen Level UP)",
    date: "Oct 2026 – Present",
    logo: "/assets/images/logos/riipen.svg",
    tech: ["Python", "PyTorch", "ROCm", "TrOCR", "Tesseract", "OpenCV"],
    bullets: [
      "Replaced a manual spreadsheet workflow with an offline Python OCR pipeline that turns bank statements, handwritten cheques and receipts into ledger-ready CSVs. It gets through 29 documents and 80 transactions in about 30 seconds instead of 2.5+ hours of data entry, roughly 250x faster.",
      "Ran Microsoft's TrOCR models locally on an AMD GPU with PyTorch and ROCm to read handwritten cheques, going from 14 to 2.6 seconds per cheque (5x faster). Each amount is checked against its written-out value, so misreads get flagged before they reach the books.",
      "Got all 54 statement transactions and the totals on all 16 receipts exactly right against hand-checked answers, by reconciling every statement balance and checking line items, 13% HST and totals to the cent.",
      "Built the matching and duplicate detection. It matched 75% of receipts to bank and credit card records on its own and flagged every duplicate and refund mismatch, so reviewers only check flagged items instead of every row."
    ]
  },
  {
    title: "Academic Initiatives and Student Support Developer",
    company: "Toronto Metropolitan University",
    date: "Sep 2026 – Present",
    logo: "/assets/images/logos/tmu.svg",
    tech: ["JavaScript", "React", "Tailwind", "HTML/CSS", "Google Apps Script"],
    bullets: [
      "Worked on web calculators that help engineering students with their grades, course planning and assignment timelines.",
      "Wrote Google Apps Script tools that create weekly and monthly stats trackers for the office and total them up."
    ]
  },
  {
    title: "Software Developer",
    company: "Population Health Research Institute (PHRI)",
    date: "May 2024 – Apr 2025",
    logo: "/assets/images/logos/phri.png",
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

export type Accent = "purple" | "cyan" | "green" | "blue";

export const projects: {
  id: string;
  /** Omit for projects without a write-up; the card links to GitHub instead. */
  blogSlug?: string;
  title: string;
  tech: string[];
  description: string;
  github: string;
  accent: Accent;
  image: string;
}[] = [
  {
    id: "radius",
    blogSlug: "radius-system-architecture",
    title: "Radius",
    tech: ["React Native", "TypeScript", "Go", "PostgreSQL", "Redis", "WebSockets", "Python"],
    description: "Radius is a mobile inventory app for retail stores, and it's the biggest thing I've built so far. Employees use it to look up stock, run audits and handle pickup orders, and a WebSocket hub keeps managers up to date on every store live, with no refreshing. Behind the React Native app is a Go backend on a 34-table PostgreSQL database, and with Redis caching the hot data, lookups across 70,000+ records come back instantly. Logins use JWTs and bcrypt, with 4 roles so people only get to what they need. My favourite part was trying to break it: I wrote Python scripts that seed 340,000+ records across a 7-store network to load-test it. I used AI tools for boilerplate and test scaffolding, but I designed the architecture and reviewed all the generated code myself.",
    github: "https://github.com/juderozario08/radius",
    accent: "purple",
    image: "/assets/images/projects/radius.jpg"
  },
  {
    id: "blip",
    blogSlug: "blip-text-editor-piece-table",
    title: "Blip",
    tech: ["C++", "SDL2", "CMake"],
    description: "I've always wanted to know how text editors actually work, so I'm building one from scratch in C++ and SDL2, and I'm having a blast with it. Text lives in a piece table, so inserting and deleting stay instant no matter how big the file is, and undo/redo is built right on top with memory I manage by hand. Characters are pre-rendered into a texture atlas in video memory, which keeps it at a locked 60 FPS with sub-millisecond input latency, even on multi-megabyte files. A background thread watches files through the OS's own event APIs and passes changes over with lock-free atomic flags, so edits show up right away and the editor still sits near 0% CPU when idle.",
    github: "https://github.com/juderozario08/blip",
    accent: "cyan",
    image: "/assets/images/projects/blip.jpg"
  },
  {
    id: "creditguardai",
    blogSlug: "creditguardai-credit-default-prediction",
    title: "CreditGuard AI",
    tech: ["Python", "Pandas", "NumPy", "scikit-learn", "PyTorch", "Matplotlib", "Seaborn"],
    description: "Can you tell who's about to miss their credit card payments? I built CreditGuard AI to find out. It turns 30,000 raw credit card records into 47 financial risk features, then compares classical scikit-learn models with a GPU-accelerated PyTorch network. The tricky part was that only 22% of the records were defaults, so I rebalanced the classes and used 5-fold cross-validation to make sure the model was learning real risk patterns. It reached a 0.78 ROC-AUC, and what I'm happiest about is that tuning the decision threshold got it catching 80% of the people who actually defaulted.",
    github: "https://github.com/juderozario08/CreditGuardAI",
    accent: "green",
    image: "/assets/images/projects/creditguard.jpg"
  },
  {
    id: "faultkeeper",
    title: "Faultkeeper",
    tech: ["Python", "Django", "Celery", "PostgreSQL", "Redis", "WebSockets", "React", "TypeScript", "Docker"],
    description: "I was curious how tools like Sentry work under the hood, so I built my own error monitoring platform. It speaks the Sentry protocol, so you can point an official Sentry SDK at it and watch errors show up on a live React dashboard. The really fun problem was grouping: each error gets a fingerprint from its stack trace that ignores line numbers and IDs, and in a load test 5,000 events from 25 different bugs became exactly 25 issues. Moving ingest to async Django with native asyncio Redis doubled its throughput to about 200 events per second. It can even ask a local LLM for the root cause and a suggested fix.",
    github: "https://github.com/juderozario08/Faultkeeper",
    accent: "blue",
    image: "/assets/images/projects/faultkeeper.jpg"
  },
  {
    id: "stylus-cast",
    title: "Stylus-Cast",
    tech: ["C++", "Kotlin", "CMake", "Android", "macOS"],
    description: "I turned a Samsung phone and its S-Pen into a wireless drawing tablet for my Mac, with pressure, tilt, the eraser and even the barrel button. A Kotlin app captures every pen sample and fires it off in 16-byte UDP packets over the phone's own 5 GHz hotspot, so it works with no router and no internet. The hard part, and the part I loved figuring out, was that Wi-Fi delivers packets unevenly, which makes strokes look jagged. My C++ server replays them at the pen's original timing behind a small delay that adapts between 6 and 45 ms, and fills any gaps with a curve so the lines stay smooth.",
    github: "https://github.com/juderozario08/stylus-cast",
    accent: "purple",
    image: "/assets/images/projects/stylus-cast.jpg"
  }
];

export const leadership = [
  {
    title: "VP Finance",
    organization: "Practical Applications of Computer Science (PACS)",
    date: "Sep 2023 – Dec 2023",
    bullets: [
      "Managed the budget for a student-run club so we could fund computer science workshops and community events."
    ]
  },
  {
    title: "Lead Programmer",
    organization: "Neil McNeil Robotics",
    date: "Oct 2018 – 2022",
    bullets: [
      "Wrote control loops for the robot's sensors and vision system to navigate it around the competition field.",
      "Presented our designs and results to judges at competitions, and mentored younger students on hardware and software."
    ]
  }
];

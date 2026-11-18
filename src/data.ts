export const profile = {
  name: "Diaken Ramadhani Yosep",
  initials: "DRY",
  photo: "2. CukupClassic.jpeg",
  location: "Banjarmasin, Indonesia",
  title: "Software Developer",
  specialty: "Frontend & Data Automation",
  summary:
    "I build interactive web applications and turn manual reporting workflows into practical tools.",
  email: "diakendiaken@gmail.com",
  linkedin: "https://www.linkedin.com/in/diakenry/",
  github: "https://github.com/Rekaitoz",
};

export type Category = "Frontend" | "Data Automation";

export interface Project {
  slug: string;
  title: string;
  type: string;
  category: Category;
  organization: string;
  period?: string;
  summary: string;
  contribution: string;
  workflow?: string;
  outcome?: string;
  metric?: string;
  stack: string[];
  visual?: "farm" | "pipeline" | "mining" | "dashboard";
  imageFolder?: string;
  preview?: { desktop?: number; phones?: number[]; tone?: string };
  flow?: { label: string; steps: [string, string, string]; sequence?: false };
  coverAlt?: string;
  screenshots?: { file: string; alt: string }[];
}

const studio = "Not Boring Company";
const bank = "Bank Syariah Indonesia · Banjarmasin Area";
const tarkiz = "Tarkiz Paz Banua";
const web = ["React", "TypeScript", "Tailwind CSS"];

function screenshots(extension: "jpg" | "png", descriptions: string[]) {
  return descriptions.map((alt, index) => ({
    file: `screenshot-${String(index + 1).padStart(2, '0')}.${extension}`,
    alt,
  }));
}

export const projects: Project[] = [
  {
    slug: "wonderbits",
    title: "WonderBits / Bittopia",
    type: "Chrome Extension Game",
    category: "Frontend",
    organization: studio,
    period: "Feb–Dec 2025",
    visual: "farm",
    preview: { phones: [1, 2, 5], tone: "moss" },
    screenshots: screenshots("jpg", [
      "Farm gameplay with the inventory and tools drawer",
      "Tutorial pop-up introducing tools and inventory",
      "Onboarding step highlighting the tools drawer",
      "Refining preparation screen",
      "Marketplace browsing screen",
      "Marketplace orders view",
    ]),
    summary:
      "A social farming and trading game delivered as a Chrome extension.",
    contribution:
      "I developed interactive gameplay interfaces and implemented new gameplay features as part of the frontend team. I improved onboarding and in-game tutorials to help players learn how to play, refined UI patterns across gameplay screens, and optimized existing components. I also collaborated with backend developers on feature work and handled occasional Express.js bug fixes.",
    stack: ["React", "TypeScript", "Chrome Extension", "Express.js"],
  },
  {
    slug: "tarikan-all-pipeline",
    title: "Tarikan All Pipeline",
    type: "Pipeline Consolidation Tool",
    category: "Data Automation",
    organization: bank,
    visual: "pipeline",
    flow: { label: "Workbook workflow", steps: ["Branch workbooks", "Shared Excel workbook", "Area recap"] },
    summary:
      "An Excel workbook on OneDrive that consolidates branch pipeline data into a single area recap.",
    contribution:
      "I built the shared Excel workbook and set up formulas to pull data from individual branch workbooks into a consolidated summary. I structured the output so the area team could review the combined pipeline once the workbook loaded, removing the need to collect and merge branch data manually each time.",
    workflow:
      "Branch workbooks serve as the source. The shared workbook pulls and combines their pipeline data into one recap for the area team.",
    outcome:
      "One consolidation went from approximately 10–20 minutes to about 1 minute, most of it spent waiting for the workbook to load.",
    metric: "10–20 min → ~1 min",
    stack: ["Microsoft Excel", "OneDrive", "Reporting Automation"],
  },
  {
    slug: "hashland",
    title: "Hashland",
    type: "Telegram Mini App",
    category: "Frontend",
    organization: studio,
    period: "May–Jul 2025",
    visual: "mining",
    preview: { phones: [1, 2, 6], tone: "violet" },
    screenshots: screenshots("png", [
      "Hashland home with mining status and controls",
      "Mining screen in dark mode",
      "Desktop mining dashboard",
      "Mining overview with status cards",
      "Wallet and assets screen",
      "Drilling screen with illustrated equipment",
      "Pool overview with join actions",
    ]),
    summary: "A blockchain token-mining platform built as a Telegram Mini App.",
    contribution:
      "I built the frontend from scratch, including the mining and drilling screens and the asset management interface. I integrated Telegram Mini App authentication, implemented wallet connection flows for TON and EVM, and connected the mining interface to real-time WebSocket updates. I also reorganized frontend modules and state management to improve maintainability and performance.",
    workflow:
      "Users open the app in Telegram, authenticate through the Mini App, and can connect a supported wallet. WebSocket events keep the mining interface updated as activity changes.",
    stack: [...web, "WebSocket", "Telegram Mini Apps", "TON", "EVM"],
  },
  {
    slug: "priority-dashboard",
    title: "Priority Dashboard",
    type: "Priority Banking Dashboard",
    category: "Data Automation",
    organization: bank,
    visual: "dashboard",
    flow: { label: "Dashboard workflow", steps: ["Google Sheets", "Apps Script processing", "Priority dashboard"] },
    summary:
      "A web dashboard for monitoring Priority Banking performance and reviewing customer portfolio data.",
    contribution:
      "I built and deployed the Google Apps Script web app, implemented its login screen, and automated how reporting data from Google Sheets is processed for display. I organized the overview around KPI cards and growth charts, then built the Customer Master view with portfolio and cash flow comparisons, filters, and record-level detail views.",
    workflow:
      "After signing in, users can review KPI and growth summaries, then open Customer Master to filter records and inspect portfolio and cash flow details.",
    stack: ["Google Sheets", "Google Apps Script", "Web Dashboard"],
  },
  {
    slug: "meow-quest",
    title: "Meow Quest Landing Page",
    type: "Game Landing Page",
    category: "Frontend",
    organization: studio,
    period: "Apr–May 2025",
    preview: { desktop: 1, phones: [3], tone: "moss" },
    screenshots: screenshots("jpg", ["Meow Quest desktop landing page", "Interactive game preview modal", "Meow Quest mobile landing page"]),
    summary: "An animated landing page introducing a game concept.",
    contribution:
      "I built the landing page from scratch in React and TypeScript. I created responsive layouts, implemented interactive animations and modal behavior, and placed calls to action along the visitor’s path through the page. I refined the component structure and animation performance to keep the experience smooth across screen sizes.",
    stack: web,
  },
  {
    slug: "wordcraft",
    title: "Wordcraft Landing Page",
    type: "Game Landing Page",
    category: "Frontend",
    organization: studio,
    period: "May–Jun 2025",
    preview: { desktop: 2, phones: [1], tone: "sand" },
    screenshots: screenshots("jpg", ["Wordcraft mobile landing page", "Wordcraft desktop landing page with demo video"]),
    summary:
      "A landing page for a word game with a looping background, an embedded demo video, and a link to the playable game.",
    contribution:
      "I built the landing page from scratch in React and TypeScript. I implemented looping background animations, embedded the demo video, and built the modal and call-to-action flow that takes visitors from the preview to the separately hosted game. I adapted the layout and interactions for desktop and mobile.",
    stack: web,
  },
  {
    slug: "monitoring-atm",
    title: "Monitoring ATM",
    type: "ATM Monitoring & Reporting",
    flow: { label: "Import workflow", steps: ["Raw ATM file", "Drag-and-drop import", "Dashboard summary"] },
    category: "Data Automation",
    organization: bank,
    summary:
      "A spreadsheet tool that turns new ATM source files into a monitoring summary.",
    contribution:
      "I implemented the drag-and-drop import for the latest raw ATM data file and automated how the imported data is organized and summarized. I also built the dashboard modal and connected it to a button in the spreadsheet so users could open the processed report directly from their reporting workspace.",
    workflow:
      "Users drop in the latest raw file and select the dashboard button to review the organized summary in a modal.",
    stack: ["Spreadsheet", "Reporting Automation"],
  },
  {
    slug: "daily-activity-ftr",
    title: "Rekap Daily Activity FTR",
    type: "Daily Activity Recap Tool",
    flow: { label: "Daily reporting workflow", steps: ["Activity entries", "Shared workbook", "Daily FTR recap"] },
    category: "Data Automation",
    organization: bank,
    summary:
      "A shared Excel workbook on OneDrive for preparing daily FTR recaps.",
    contribution:
      "I built the workbook around the team’s recurring FTR reporting process. I organized the daily activity entries and recap layout in the same workbook so the team had a consistent place to prepare and review each day’s recap.",
    stack: ["Microsoft Excel", "OneDrive"],
  },
  {
    slug: "ecoeduhealth",
    title: "Ecoeduhealth",
    type: "Mobile App, Admin CMS & Landing Page",
    category: "Frontend",
    organization: "",
    period: "Jan 2025–Present",
    preview: { desktop: 3, phones: [1], tone: "teal" },
    screenshots: screenshots("jpg", [
      "Participant home and quiz activity menu",
      "Participant quiz questions",
      "CMS quiz list",
      "CMS question and answer configuration",
      "Word-search activity",
      "Crossword grid and clues",
    ]),
    summary:
      "A quiz platform with a mobile app for participants, a web CMS for administrators, and a company landing page.",
    contribution:
      "I developed the frontend for all three surfaces using React and TypeScript. In the mobile app, I built the sign-in and quiz interfaces so participants could log in and answer questions configured by administrators. In the CMS, I built the interface for creating and managing questions, configuring answers, and setting scores. I also built the company landing page.",
    workflow:
      "Administrators configure quiz content and scoring in the CMS. Participants sign in to the mobile app to access and answer the questions.",
    stack: ["React", "TypeScript"],
  },
  {
    slug: "treatment-schedule",
    title: "Treatment Schedule App",
    type: "Medication Reminder App",
    category: "Frontend",
    organization: "",
    period: "Jul–Aug 2024",
    imageFolder: "treatment",
    preview: { phones: [1, 2, 5], tone: "rose" },
    screenshots: screenshots("jpg", [
      "Home screen with the daily medication schedule",
      "Form for adding a medication reminder",
      "Medication selection screen",
      "Reminder scheduling screen",
      "Saved medication reminder details",
    ]),
    summary:
      "A mobile app for scheduling medication and receiving reminder alarms.",
    contribution:
      "I developed the mobile app, including sign-in, the medication scheduling form, and the reminder alarm. I built the form so users could enter the medication type, select the days and times for each reminder, specify how often to take a dose, and add notes to the schedule.",
    workflow:
      "Users sign in, add a medication, and save its schedule. The app triggers an alarm at the configured times.",
    stack: web,
  },
  {
    slug: "adhom",
    title: "Adhom Sales Analytics",
    preview: { desktop: 1, tone: "teal" },
    screenshots: screenshots("jpg", ["Sales dashboard with a comparison chart", "Financial summary view"]),
    type: "Sales Analytics Web App",
    category: "Frontend",
    organization: tarkiz,
    period: "Apr–Jun 2023",
    summary:
      "A web app for tracking sales and helping businesses review profit and loss.",
    contribution:
      "I designed and developed the sales analytics interface using React, TypeScript, and Tailwind CSS. I organized the information around the sales process, from recording transactions to reviewing their financial outcomes, so users could follow sales activity and see the resulting profit and loss information.",
    stack: web,
  },
  {
    slug: "ebudidaya",
    title: "Ebudidaya Platform",
    preview: { desktop: 6, phones: [2], tone: "moss" },
    screenshots: screenshots("jpg", [
      "Ebudidaya mobile home screen",
      "Mobile article list",
      "Livestock care article",
      "Schedule overview",
      "Conversation screen",
      "Ebudidaya CMS dashboard",
      "CMS transaction list",
      "CMS transaction form",
    ]),
    type: "Platform & CMS",
    category: "Frontend",
    organization: tarkiz,
    period: "Apr–Jun 2023",
    summary:
      "A livestock and plant care platform with a mobile app and a CMS for articles, sales tracking, and stock monitoring.",
    contribution:
      "As a frontend intern, I helped develop the web interface using React, TypeScript, and Tailwind CSS. I translated the team’s UI designs into responsive layouts and reusable components for a platform that brings care articles, sales information, and stock monitoring together.",
    stack: web,
  },
  {
    slug: "munzalan",
    title: "Munzalan Platform",
    preview: { desktop: 8, phones: [1], tone: "rose" },
    screenshots: screenshots("jpg", [
      "Munzalan mobile home and campaigns",
      "Mobile donation campaign details",
      "Donation confirmation",
      "Donation history",
      "Notification list",
      "Donation payment details",
      "Mobile study material",
      "Munzalan desktop landing page",
      "Desktop study article",
      "Desktop donation form",
    ]),
    type: "Web & Mobile Platform",
    category: "Frontend",
    organization: tarkiz,
    period: "Apr–Jun 2023",
    summary:
      "A web and mobile platform for donations and access to Islamic study materials.",
    contribution:
      "I contributed to the web frontend as part of the internship team. I turned UI/UX designs into responsive React components for the donation and study materials platform, using TypeScript and Tailwind CSS to keep the interface consistent across screen sizes.",
    stack: web,
  },
  {
    slug: "hola-pulsa",
    title: "Hola Pulsa Platform",
    type: "Academy Team Project",
    flow: { label: "Product categories", steps: ["Airtime", "Electricity tokens", "Digital products"], sequence: false },
    category: "Frontend",
    organization: "Alterra Academy",
    period: "Nov–Dec 2022",
    summary:
      "A team training project for purchasing airtime, electricity tokens, and other digital products.",
    contribution:
      "I implemented React interfaces as part of the academy’s frontend team. I coordinated with UI/UX teammates on screen requirements and collaborated with backend and QA participants as we developed and checked the purchase experience.",
    stack: ["React"],
  },
];

export const experience = [
  {
    organization: "Bank Syariah Indonesia",
    location: "Banjarmasin Area",
    role: "Funding & Priority Data & Automation Intern",
    period: "Aug 2026–Present",
    summary:
      "Supported Funding Retail and Funding Priority through reporting, data processing, and dashboard development.",
    contributions: [
      "Joined through the Kemnaker Internship Program on 10 August 2026.",
      "Built Excel formulas and developed spreadsheets and dashboards with Google Sheets and Google Apps Script.",
      "Developed Excel import workflows that turned raw files into summaries and dashboard data.",
    ],
  },
  {
    organization: studio,
    location: "Singapore · Remote",
    role: "Junior Frontend Developer (Contract)",
    period: "Feb 2025–Jan 2026",
    summary:
      "Contributed to Chrome extensions, Telegram Mini Apps, blockchain platforms, and interactive websites.",
    contributions: [
      "Developed frontend features, improved component structure and performance, and fixed bugs.",
      "Integrated REST APIs and WebSockets and worked with backend engineers, designers, and QA.",
    ],
  },
  {
    organization: "Freelance",
    location: "",
    role: "Freelance Frontend Developer",
    period: "Jul 2023–Jan 2025",
    summary:
      "Built CMS dashboards, company profile sites, promotional pages, and responsive app interfaces.",
    contributions: [
      "Integrated REST APIs and collaborated with backend developers and UI/UX designers.",
    ],
  },
  {
    organization: tarkiz,
    location: "Banjarbaru, Indonesia",
    role: "Frontend Developer Intern",
    period: "Apr–Jun 2023",
    summary:
      "Built responsive interfaces and reusable React and TypeScript components.",
    contributions: [
      "Integrated REST APIs and used Git-based workflows across Adhom Sales Analytics, Ebudidaya, and Munzalan.",
    ],
  },
  {
    organization: "Alterra Academy",
    location: "",
    role: "React JS Front-End Engineer (MSIB)",
    period: "Aug–Dec 2022",
    summary:
      "Completed the certified independent study program with a “Very Good” grade and a score of 93/100.",
    contributions: [
      "Built React interfaces individually and in an Agile team with backend, UI/UX, and QA participants.",
    ],
  },
];

export const about = {
  education: {
    degree: "Bachelor’s in Computer Science",
    university: "Universitas Lambung Mangkurat",
    detail: "Graduated 2025 · GPA 3.70/4.00",
  },
  skills: [
    {
      title: "Frontend",
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "Next.js",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "Responsive Web Design",
      ],
    },
    {
      title: "Integration",
      items: [
        "REST APIs",
        "WebSocket",
        "Git",
        "Express.js (additional experience)",
      ],
    },
    {
      title: "Data & Automation",
      items: [
        "Microsoft Excel",
        "Google Sheets",
        "Google Apps Script",
        "Reporting Automation",
        "Dashboard Development",
      ],
    },
  ],
  awards: [
    "Second Place · National Youth Tech Competition (NYTECOMP), 2023",
    "Second Place · National Battle CSS Competition, 2022",
  ],
  certifications: [
    "Responsive Web Design · freeCodeCamp, 2023",
    "English Proficiency Test (EPT) · Universitas Lambung Mangkurat, 2023",
    "React JS Front-End Engineer · Alterra Academy, 2022",
    "Microsoft Office Specialist (PowerPoint) · Certiport, 2020",
  ],
  activities: [
    "Information Technology Development Coordinator at HIMAKOM, Universitas Lambung Mangkurat, 2024. Team member, 2022–2023.",
    "Teaching Assistant at FMIPA, Universitas Lambung Mangkurat, 2022–2023. Courses included Algorithms and Data Structures, Basic Programming, and Advanced Programming.",
  ],
  languages: "Indonesian (native) · English (professional working proficiency)",
};

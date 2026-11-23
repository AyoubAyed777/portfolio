export const profile = {
  name: 'Ayoub Ayed',
  role: 'Computer Science Student',
  location: 'Tunis, Tunisia',
  email: 'ayedayoub620@gmail.com',
  github: 'https://github.com/AyoubAyed777',
  linkedin: 'https://linkedin.com/in/ayoub-ayed-563248407',
  summary:
    'Final-year computer science student at Université Tunis El Manar with a solid foundation in algorithms, data structures, databases and systems, and hands-on experience shipping features and fixing production bugs during a three-month software internship.',
  seeking: 'Seeking a Final-Year Project Internship',
}

export const experience = [
  {
    role: 'Software Development Intern',
    company: 'Prestige Holidays & Concierge · Trade Connect Service SARL',
    period: 'Jun 2026 – Aug 2026',
    location: 'Tunis, Tunisia',
    description:
      'Contributed to the My Prestige Holidays production platform for tourism, concierge, premium transport and travel reservations.',
    highlights: [
      'Developed and evolved mobile application features, including chat and user-assistance functionality.',
      'Integrated AI-based features and performed functional and technical testing.',
      'Investigated, debugged and corrected defects encountered in production.',
      'Supported performance, stability, deployment, release and corrective/evolutionary maintenance.',
      'Maintained technical documentation and participated in feature validation.',
    ],
  },
]

export const projects = [
  {
    slug: 'my-prestige-holidays',
    title: 'My Prestige Holidays',
    subtitle: 'Mobile application',
    stack: ['React', 'Expo', 'Mobile Development', 'Production Deployment'],
    summary:
      'Worked on a real production application across implementation, testing, debugging, deployment and maintenance.',
    problem:
      'The production platform supports tourism, concierge, premium transport and travel reservation workflows.',
    build:
      'Contributed to mobile features, including chat and user-assistance functionality, while validating changes through functional and technical testing.',
    decisions: [
      'Worked within the existing production application and deployment process.',
      'Integrated AI-based functionality and performed technical validation.',
      'Addressed defects and supported stability through corrective and evolutionary maintenance.',
    ],
  },
  {
    slug: 'chat-simulator',
    title: 'Chat Simulator',
    subtitle: 'ChatGPT / Claude-style clone',
    stack: ['JavaScript', 'Node.js', 'Express', 'Google Gemini API'],
    url: 'https://github.com/AyoubAyed777/ChatClone',
    liveUrl: 'https://ayoubayed777.github.io/ChatClone/',
    summary:
      'Built a conversational web app with a chat interface that sends messages and displays AI-generated replies.',
    problem:
      'Create a practical, responsive conversational interface that communicates with Gemini while keeping API credentials outside the browser.',
    build:
      'Implemented a vanilla JavaScript interface served by Express and connected it to Gemini through a server-side API. The app supports multiple conversations, streamed replies, conversation persistence and light/dark themes.',
    features: [
      'Multiple named conversations stored in the browser',
      'Server-sent Gemini response streaming',
      'Suggested prompt cards for a first-time empty state',
      'Responsive sidebar with mobile navigation',
      'Light and dark themes persisted locally',
      'Keyboard shortcuts and loading/error states',
    ],
    decisions: [
      'Kept the Gemini API key in the Node environment and never exposed it in client-side JavaScript.',
      'Used Express to proxy chat requests and return streamed text events.',
      'Persisted conversations and messages in localStorage for a lightweight, account-free experience.',
      'Sent the recent transcript to Gemini with a concise system instruction for context.',
    ],
    result:
      'The project delivers an end-to-end Gemini chat experience with conversation management, streaming responses and a responsive interface.',
  },
  {
    slug: 'tetris-clone',
    title: 'Tetris Clone',
    subtitle: 'raylib game',
    stack: ['C', 'raylib', 'Game Logic'],
    url: 'https://github.com/AyoubAyed777/tetris-clone',
    preview: 'https://raw.githubusercontent.com/AyoubAyed777/tetris-clone/main/preview.jpg',
    summary:
      'Built a Tetris-style game applying structured programming, game logic and problem-solving.',
    problem:
      'Build a playable Tetris-style desktop game with piece movement, rotation, collision handling, line clearing and game-state feedback.',
    build:
      'Separated the implementation into grid, block, position, color and game modules. Raylib handles the 520 x 700 rendering loop while C++ code manages piece state and gameplay.',
    features: [
      'Seven randomly selected tetromino types',
      'Movement, rotation, soft drop and hard drop',
      'Collision detection and wall/occupied-cell fitting',
      'Full-row clearing with 100, 300, 500 and 800-point scoring tiers',
      'Next-piece preview, line counter and score display',
      'Pause, game-over, reset and restart states',
    ],
    decisions: [
      'Used a grid-based model with block position offsets for predictable collision checks.',
      'Stored rotation states for each tetromino instead of generating rotations at runtime.',
      'Separated rendering, input handling and update logic for easier maintenance.',
      'Used a fixed 60 FPS window and time-based falling speed.',
    ],
    result:
      'The game is a complete, restartable Tetris clone with keyboard controls, scoring, a next-piece preview and clear pause/game-over states.',
  },
  {
    slug: 'oracle-plsql-projects',
    title: 'Oracle / PL/SQL Database Projects',
    subtitle: 'Academic relational database work',
    stack: ['SQL', 'PL/SQL', 'Oracle XE 21c', 'Relational Databases'],
    summary:
      'Developed academic database work using SQL queries, PL/SQL procedures and relational database concepts.',
    problem:
      'Practice relational database design and implementation in Oracle.',
    build:
      'Wrote SQL queries and PL/SQL procedures while applying relational database concepts.',
    features: [
      'SQL query work for structured relational data',
      'PL/SQL procedure implementation',
      'Oracle XE 21c database exercises',
      'Academic use of relational database concepts',
    ],
    decisions: [
      'Used Oracle XE 21c as the database environment.',
      'Used PL/SQL procedures for database logic.',
    ],
    result:
      'Produced academic Oracle database work combining relational queries, procedures and core database concepts.',
  },
  {
    slug: 'applypilot',
    title: 'ApplyPilot',
    subtitle: 'Open-source contribution',
    stack: ['Python', 'Automation', 'Fork'],
    url: 'https://github.com/AyoubAyed777/ApplyPilot',
    summary:
      'Extended a forked job-application automation tool so users could choose between Claude Code and Antigravity for auto-apply.',
    problem:
      'Extend the forked ApplyPilot tool with more choice in its automated application workflow.',
    build:
      'Modified the Python automation fork to let users choose between Claude Code and Antigravity.',
    features: [
      'Fork-based extension of an open-source job-application automation tool',
      'Python-based automation contribution',
      'A choice between Claude Code and Antigravity for the auto-apply workflow',
    ],
    decisions: [
      'Built on an existing Python automation tool.',
      'Added a choice between Claude Code and Antigravity for the auto-apply process.',
    ],
    result:
      'Expanded the forked Python automation project with an additional agent choice for users running its job-application workflow.',
  },
]

export const skills = [
  { title: 'Programming', items: ['Python', 'C', 'C++', 'JavaScript'] },
  { title: 'Web & Mobile', items: ['HTML', 'CSS', 'React', 'Expo'] },
  { title: 'Databases', items: ['SQL', 'PL/SQL', 'Oracle XE 21c'] },
  { title: 'Tools & Systems', items: ['Linux', 'Git', 'GitHub', 'VS Code', 'raylib'] },
  { title: 'Computer Science', items: ['Data Structures', 'Algorithms', 'OOP'] },
]

export const education = [
  {
    school: 'Université Tunis El Manar',
    institution: 'Faculté des Sciences de Tunis',
    degree: "Bachelor's in Computer Science — Final Year",
    period: '2026 – 2027',
  },
  {
    school: 'Université Tunis El Manar',
    institution: 'Faculté des Sciences de Tunis',
    degree: 'Integrated Preparatory Cycle — Mathematics & Computer Science (MPI)',
    period: '2024 – 2026',
  },
  {
    school: 'Lycée Farabi Mornaguia',
    institution: '',
    degree: 'Baccalaureate — Information Technology',
    period: '2024',
    note: 'Mention Très Bien · 18.09/20 · Ranked 43rd nationally',
  },
]

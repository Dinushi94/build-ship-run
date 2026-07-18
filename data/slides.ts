import { title } from "framer-motion/m";

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  type: 'intro' | 'question' | 'split' | 'flow' | 'lab' | 'grid' | 'final';
  time: string;
  hint?: string;
  content: any;
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "Build → Ship → Run",
    subtitle: "An Introduction to DevOps, Cloud Computing & Site Reliability Engineering",
    type: "intro",
    time: "0-5 min",
    content: {
      speaker: "Dinushi Dhananjani",
      role: "Senior DevOps Engineer",
      hook: "Instead of just talking about DevOps... We're actually going to deploy a live application to the cloud today."
    }
  },
  {
    id: 2,
    title: "How does this happen?",
    type: "question",
    time: "5-8 min",

    content: {
      question: "Every single day, these platforms deploy software updates hundreds of times without dropping your connection. How?",
      logos: ["Netflix", "Spotify", "TikTok", "YouTube", "ChatGPT"]
    }
  },
  {
    id: 3,
    title: "Traditional Software Development",
    type: "split",
    time: "8-15 min",
    hint: "Draw out the pain of the 'Wall of Confusion' where devs toss code over to ops.",
    content: {
      flow: ["Developer", "Operations", "System Admin", "Server", "Users"],
      problems: ["Slow deployments (weeks/months)", "Fragile manual server configuration", "Frequent human errors & downtime", "Teams blaming each other when things break"]
    }
  },
  {
    id: 4,
    title: "Then DevOps Was Born",
    type: "intro",
    time: "15-20 min",
    hint: "Emphasize that DevOps is a cultural mindset shift, not just a software tool.",
    content: {
      negative: ["DevOps isn't Docker.", "DevOps isn't Kubernetes.", "DevOps isn't just a set of tools."],
      positive: "DevOps is a culture and professional movement that brings Development and Operations together to deliver software faster, continuously, and safely."
    }
  },
  {
    id: 5,
    title: "The DevOps Lifecycle",
    type: "flow",
    time: "20-25 min",
    hint: "Walk through the infinity loop concept. Show how monitoring feeds right back into planning.",
    content: {
      steps: ["Plan", "Code", "Build", "Test", "Release", "Deploy", "Operate", "Monitor"]
    }
  },
  {
    id: 6,
    title: "Where Does the Cloud Fit?",
    type: "question",
    time: "25-28 min",
    hint: "Pivot from the abstract software lifecycle to physical/virtual infrastructure.",
    content: {
      question: "Where do these stages actually execute? Where do applications live, breathe, and scale?",
      answer: "The Cloud."
    }
  },
  {
    id: 7,
    title: "Cloud Computing Paradigm Shift",
    type: "split",
    time: "28-33 min",
    hint: "Highlight the massive financial transition from CapEx (buying hardware) to OpEx (renting).",
    content: {
      leftTitle: "Traditional On-Premise",
      leftItems: ["Predict hardware needs months ahead", "Massive upfront capital cost", "Manual maintenance & cooling", "Hard to scale rapidly"],
      rightTitle: "Cloud Infrastructure",
      rightItems: ["Rent compute resources instantly", "Pay only for what you run", "Global scale in two clicks", "Managed physical security"],
      providers: ["AWS", "Azure", "Google Cloud"]
    }
  },
  {
    id: 8,
    title: "Cloud Service Models",
    type: "grid",
    time: "33-38 min",
    hint: "Explain the tradeoff: Less management means more developer productivity.",
    content: {
      columns: [
        { title: "On-Prem", desc: "You own and manage everything from cables to application code." },
        { title: "IaaS (EC2)", desc: "Provider gives you virtual hardware. You manage OS and runtimes." },
        { title: "PaaS (Cloud Run)", desc: "Provide code/containers. Platform configures scaling & routing." },
        { title: "Serverless (Vercel)", desc: "Zero infrastructure thinking. Just write code and deploy." }
      ]
    }
  },
  {
    id: 9,
    title: "Our Target Goal Today",
    type: "flow",
    time: "38-40 min",
    hint: "Get them excited. This is the structural map for the upcoming hands-on lab.",
    content: {
      steps: ["Local Laptop", "GitHub Repo", "Vercel Build Engine", "Edge Network CDN", "Global Users"]
    }
  },
  {
    id: 10,
    title: "🚀 Hands-on Lab 01: Local Engine",
    type: "lab",
    time: "40-50 min",
    hint: "Walk around the room. Make sure everyone has their local dev server running properly.",
    content: {
      steps: [
        "Clone the workshop repository from GitHub",
        "Run 'npm install' or 'pnpm install' to fetch dependencies",
        "Boot local environment: 'npm run dev'",
        "Open http://localhost:3000 and modify the header text"
      ],
      insight: "Right now, nobody else on Earth can see this website. It only lives on your machine."
    }
  },
  {
    id: 11,
    title: "🚀 Hands-on Lab 02: Launching to Production",
    type: "lab",
    time: "50-60 min",
    hint: "Celebrate with them when their live Vercel links hit the projector screen.",
    content: {
      steps: [
        "Initialize git repository and commit your changes",
        "Create a new GitHub repository and push your project branch",
        "Log into Vercel and link your GitHub repository",
        "Click 'Deploy' and watch the build pipelines process"
      ],
      insight: "Congratulations! You now have a production public URL: your-project.vercel.app"
    }
  },
  {
    id: 12,
    title: "The Static Problem",
    type: "question",
    time: "60-63 min",
    hint: "Proactively create a problem to explain the vital need for automation pipelines.",
    content: {
      question: "Go to your code, change 'Hello World' to 'Hello University', and refresh your live public link. What happens?",
      answer: "Nothing changed. Why?"
    }
  },
  {
    id: 13,
    title: "The Manual Deployment Nightmare",
    type: "split",
    time: "63-68 min",
    hint: "Contrast this bottleneck with modern hyper-scale tech engineering velocities.",
    content: {
      flow: ["Developer", "Zip Files", "FTP Upload", "SSH Into Server", "Manual Restart"],
      danger: "Imagine 100 developers building features simultaneously and deploying 20 times a day. Manual coordination is entirely impossible."
    }
  },
  {
    id: 14,
    title: "Enter CI/CD Pipelines",
    type: "split",
    time: "68-73 min",
    hint: "Define CI and CD cleanly. They are the production conveyer belts of modern code.",
    content: {
      leftTitle: "Continuous Integration (CI)",
      leftItems: ["Automated code merging", "Automatic syntax compilation", "Unit testing on every push", "Early error catching"],
      rightTitle: "Continuous Deployment (CD)",
      rightItems: ["Automated environment builds", "Zero-downtime rolling deploys", "Instant validation", "Fast production rollback"]
    }
  },
  {
    id: 15,
    title: "Automation via GitHub Actions",
    type: "flow",
    time: "73-78 min",
    hint: "Show a real snippets of a YAML workflow on screen so the syntax isn't scary.",
    content: {
      steps: ["Code Edit", "Git Push", "GitHub Webhook Trigger", "Runner Executes YAML Workflow", "Production Update"]
    }
  },
  {
    id: 16,
    title: "🚀 Hands-on Lab 03: Automated Pipeline",
    type: "lab",
    time: "78-85 min",
    hint: "Have them track the live green checkmarks inside their GitHub Actions UI dashboard.",
    content: {
      steps: [
        "Edit the page file locally one more time",
        "Execute: git commit -am 'testing CI/CD pipeline'",
        "Execute: git push origin main",
        "Open your browser, watch GitHub Actions build, and refresh your production site"
      ],
      insight: "No manuals, no zippers, no FTP. Just push code and let automation handle the rest."
    }
  },
  {
    id: 17,
    title: "Scaling to Enterprise Realities",
    type: "question",
    time: "85-87 min",
    hint: "Transition from simple managed hosting to complex multi-cloud corporate infrastructure.",
    content: {
      question: "Would companies like Netflix, Airbnb, or Amazon deploy their mission-critical backends like this?",
      answer: "No. They need fine-grained systems control, cross-platform predictability, and microservices."
    }
  },
  {
    id: 18,
    title: "The Infamous Environment Dilemma",
    type: "split",
    time: "87-90 min",
    hint: "Act out the classic dispute: 'But it worked perfectly fine on my machine!'",
    content: {
      leftTitle: "Developer Environment",
      leftItems: ["macOS M3 Air", "Node.js v22.1", "Local SQLite Database", "Fast Network"],
      rightTitle: "Production Environment",
      rightItems: ["Linux Ubuntu Server", "Node.js v18.4 (Outdated)", "Production Postgres", "Strict Firewall Rule Configs"],
      result: "💥 Boom! Production crashes instantly due to environment discrepancy."
    }
  },
  {
    id: 19,
    title: "The Blueprint Solution: Docker",
    type: "grid",
    time: "90-95 min",
    hint: "Use the classic ocean shipping container analogy to nail the concept home.",
    content: {
      columns: [
        { title: "The Dockerfile", desc: "A text blueprint declaring dependencies, OS variables, and execution startup commands." },
        { title: "The Image", desc: "A frozen, immutable package containing exactly what your app needs to run." },
        { title: "The Container", desc: "A live, isolated execution sandbox running perfectly on any host OS." }
      ]
    }
  },
  {
    id: 20,
    title: "Owning Infrastructure on AWS",
    type: "flow",
    time: "95-98 min",
    hint: "Show them the paradigm shift of running your own cloud servers instead of using PaaS.",
    content: {
      steps: ["Web Browser Client", "AWS Internet Gateway", "EC2 Virtual Linux Node", "Docker Sandbox Engine", "Running App Instances"]
    }
  },
  {
    id: 21,
    title: "💻 Live Instructor Demonstration",
    type: "lab",
    time: "98-105 min",
    hint: "Keep this smooth. Have terminal tabs preset to avoid typos during the live demo.",
    content: {
      steps: [
        "SSH securely directly into a live remote AWS EC2 Linux virtual instance",
        "Pull down the dockerized application blueprint package",
        "Build the image: 'docker build -t app:prod .'",
        "Launch application sandbox container node using detached execution flags"
      ],
      insight: "Same source application code, entirely distinct underlying structural cloud infrastructure."
    }
  },
  {
    id: 22,
    title: "The Industrial Enterprise Landscape",
    type: "flow",
    time: "105-108 min",
    hint: "Don't overwhelm them; show this as the natural scaling extension of what they learned.",
    content: {
      steps: ["Git Push", "GitHub Actions", "Docker Registry", "Kubernetes Orchestrator", "Prometheus Metrics", "Global Scale"]
    }
  },
  {
    id: 23,
    title: "When Production Breaks",
    type: "question",
    time: "108-110 min",
    hint: "Introduce the harsh realities of hardware degradation and software system bugs.",
    content: {
      question: "It is 3:00 AM. A database connection pool runs out of memory. The server crashes. Who notices? How do we recover?",
      answer: "This is exactly why we need Site Reliability Engineering (SRE)."
    }
  },
  {
    id: 24,
    title: "What is Site Reliability Engineering?",
    type: "intro",
    time: "110-112 min",
    hint: "Quote the famous Benjamin Treynor Sloss definition from Google directly.",
    content: {
      origin: "Originating inside Google to solve massive scale operational engineering challenges.",
      definition: "SRE is fundamentally what happens when you ask a software engineer to design an operations function."
    }
  },
  {
    id: 25,
    title: "The Foundational SRE Principles",
    type: "grid",
    time: "112-115 min",
    hint: "Explain that 100% uptime is a myth; you always need a margin for failure and upgrades.",
    content: {
      columns: [
        { title: "Automation", desc: "Destroy human toil. Write operational scripts to replace routine manual work." },
        { title: "Monitoring", desc: "Gain deep instrumentation visibility into systems using logs, metrics, and tracing metrics." },
        { title: "Error Budgets", desc: "Balance the acceptable threshold of system failure against the velocity of features." },
        { title: "Blameless Post-Mortems", desc: "Fix the broken structural system process, never focus on blaming individuals." }
      ]
    }
  },
  {
    id: 26,
    title: "The Observability Loop",
    type: "flow",
    time: "115-117 min",
    hint: "Explain how automated telemetry telemetry warns us before users ever notice a slowdown.",
    content: {
      steps: ["Target Fleet", "Prometheus Scraper", "Grafana Alert Rule Engine", "PagerDuty Page", "On-Call Engineer Resolution"]
    }
  },
  {
    id: 27,
    title: "Production Infrastructure At Scale",
    type: "flow",
    time: "117-120 min",
    hint: "Conclude the core engineering loop by showing a comprehensive system landscape design.",
    content: {
      steps: ["Users", "Load Balancer Edge", "Kubernetes Pod Cluster", "Distributed Database Cluster", "Observability Engine Fleet"]
    }
  },
  {
    id: 28,
    title: "Your Engineering Career Roadmap",
    type: "grid",
    time: "120-123 min",
    hint: "Reassure students that nobody learns this overnight. Emphasize step-by-step progress.",
    content: {
      columns: [
        { title: "Year 1: Core", desc: "Master Linux terminal navigation, fundamental TCP/IP networking, basic Git branching, and scripting." },
        { title: "Year 2: Foundations", desc: "Understand Cloud abstractions, Docker container build pipelines, and automated GitHub actions." },
        { title: "Year 3: Scale", desc: "Adopt Infrastructure as Code (Terraform), Kubernetes cluster orchestration, and AWS engineering." },
        { title: "Year 4: Advanced", desc: "Dive deep into SRE, advanced Observability frameworks, fault-tolerant design, and cloud security." }
      ]
    }
  },
  {
    id: 29,
    title: "Industry Roles & Specializations",
    type: "grid",
    time: "123-125 min",
    hint: "Focus on what day-to-day life looks like in these roles rather than static cash values.",
    content: {
      columns: [
        { title: "DevOps / Platform", desc: "Architecting the developer internal self-service software pipeline platform engines." },
        { title: "SRE Specialist", desc: "Maximizing production runtime availability, engineering resilience targets, scaling infrastructure." },
        { title: "Solutions Architect", desc: "Designing comprehensive, enterprise global systems layouts matching client financial frameworks." }
      ]
    }
  },
  {
    id: 30,
    title: "Your Concrete Next Steps",
    type: "flow",
    time: "125-127 min",
    hint: "Encourage them to build an actual project right after leaving this lecture hall.",
    content: {
      steps: ["Git Basics", "Linux Shell", "Dockerize An App", "Deploy to Cloud", "Automate Pipelines", "Instrument Metrics"]
    }
  },
  {
    id: 31,
    title: "Interactive Open Q&A Session",
    type: "final",
    time: "127-130 min",
    hint: "Wrap up strongly. Leave your contact info visible on the screen during the entire Q&A session.",
    content: {
      prompt: "What surprised you the most about the modern lifecycle architecture layout today?",
      contact: "dinushi@dhananjani.dev",
      github: "github.com/dinushidhananjani"
    }
  }
];

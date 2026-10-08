// All your content lives here. Edit this file to update the site.
const PROFILE = {
  name: "Roshan K",
  tagline: "i train things, ship things, and build the rest",

  now: [
    "building workflows on n8n",
    "combining fine-tuned models with rag",
    "making production level web apps",
  ],

  // A project's tags must match these tool names for the filter to work
  stack: {
    ml: ["python", "langchain", "scikit-learn", "hugging face", "opencv"],
    web: ["typescript", "react", "mongoo", "node"],
    data: ["pandas", "sql", "mongodb"],
    tools: ["postman", "git", "linux"],
    others: ["java", "dsa"],
  },

  projects: [
    {
      name: "chautari",
      summary: "full-stack campus platform with AI-powered assistance.",
      details:
        "MERN platform with role-based dashboards, real-time messaging, campus operations, and a RAG-powered AI assistant.",
      tags: ["react", "node.js", "mongodb", "socket.io", "groq"],
      url: "https://github.com/frankuard/MERN-SEP-PROJECT",
    },
    {
      name: "ai-video-assistant",
      summary: "AI assistant that turns videos into searchable content",
      details:
        "Whisper transcription, LLM-generated summaries and action items, ChromaDB embeddings, semantic search, and RAG-based question answering.",
      tags: ["python", "langchain", "whisper", "chromadb", "groq"],
      url: "https://github.com/frankuard/video-assistant-with-rag",
    },
    {
      name: "ai-research-assistant",
      summary: "multi-agent AI system for autonomous web research.",
      details:
        "Four-stage agent pipeline using Tavily search, webpage extraction, LangChain report generation, and a critic chain with a React and Tailwind interface.",
      tags: ["python", "langchain", "groq", "react", "tavily", "fastapi"],
      url: "https://github.com/frankuard/multi-agent-ai-research-system-using-langchain",
    },
    {
      name: "banking-backend",
      summary: "production level banking backend built with Node.js.",
      details:
        "REST API with JWT authentication, bcrypt hashing, token blacklisting, transactions, ledger records, idempotency, account management, and email notifications.",
      tags: ["node.js", "express", "mongodb", "jwt", "rest api"],
      url: "https://github.com/frankuard/Bank-Management-System-Backend",
    },
  ],

  background: [
    {
      title: "web developer",
      points: [
        "built and shipped sites and web apps",
        "handled design, front end, back end and hosting",
        "made multiple projects on mern",
      ],
    },
    {
      title: "founder,research head, BIC AI Horizon",
      points: [
        "founded ai horizon community under bic devcorps at biratnagar international college",
        "lead the research side of BIC AI Horizon",
        "guide the team from idea to results",
      ],
    },
    {
      title: "ai / ml developer",
      points: [
        "build and train models",
        "wire them into real web products",
        "evaluate and improve them over time",
      ],
    },
  ],

  links: [
    { label: "github", url: "https://github.com/frankuard" },
    {
      label: "linkedin",
      url: "https://www.linkedin.com/in/roshan-karki-98188837b/",
    },
    { label: "email", url: "mailto:roshankarki4956@gmail.com" },
  ],
};

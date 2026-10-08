// All your content lives here. Edit this file to update the site.
const PROFILE = {
  name: "Roshan K",
  tagline: "i train things, ship things, and build the rest",

  now: [
    "building workflows on n8n",
    "fne-tuning small models on my own data",
    "looking for my next ai / web role",
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
      name: "assistant",
      summary: "personal ai assistant that runs on my own hardware.",
      details: "agent loop, tool calls and memory, all self-hosted.",
      tags: ["python", "typescript", "docker"],
      url: "https://github.com/",
    },
    {
      name: "image-classifier",
      summary: "small vision model with a web demo.",
      details:
        "trained in pytorch, served over an api, used from a react page.",
      tags: ["python", "pytorch", "react"],
      url: "https://github.com/",
    },
    {
      name: "rag-notes",
      summary: "search and chat over my own notes.",
      details:
        "embeddings in postgres, a node api, and a simple next.js front end.",
      tags: ["hugging face", "postgres", "next.js", "node"],
      url: "https://github.com/",
    },
    {
      name: "data-dash",
      summary: "dashboard for exploring messy datasets.",
      details: "pandas on the back end, charts in react.",
      tags: ["pandas", "react", "typescript"],
      url: "https://github.com/",
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
        "pick directions and run experiments",
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

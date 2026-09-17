/* ===== Edit event details here. Every page reads from this file. ===== */
const CONFIG = {
  name: "Build an AI Agent",
  shortName: "AgentBuild",
  host: "[Your Company]",
  start: "2026-10-10T14:00:00+05:30",   // ISO start time, with timezone offset
  timezone: "IST",
  timeZoneId: "Asia/Kolkata",
  venue: "[Venue, City]",
  seats: 40,
  cost: "Yes, the workshop is free to attend.",
  registrationCloses: "2026-10-05",
  hashtag: "#AgentBuildWorkshop",
  contactEmail: "events@example.com",
  // Form endpoint (Formspree, Google Apps Script, etc.). Leave empty to fall back to email.
  formEndpoint: "",
  // Or send everyone to an external form (Luma, Google Form). Replaces the built-in form.
  externalRegisterUrl: ""
};

const AGENDA = [
  {title: "Building an Agent & Best Practices", short: "Talk", min: 45, color: "var(--primary)",
   desc: "How to build an agent end to end with Codex/Claude + Skills + MCP, plus the best practices we've learned.",
   points: ["What an agent is, and when you need one", "Live build: model + Skills + MCP", "Best practices: scoping, prompts, tool design, testing"]},
  {title: "Team Forming & Seating", short: "Teams", min: 30, color: "var(--accent-3)",
   desc: "Teams and seating are finalized in advance, so this is just a quick settle-in.",
   points: ["Find your team and table", "Pick your problem statement", "Check that your tools are set up"]},
  {title: "Build Time", short: "Build", min: 120, color: "var(--accent)",
   desc: "Teams apply the same approach to build an agent for a small, practical problem.",
   points: ["Define the agent's job and inputs", "Write a Skill, connect tools through MCP", "Iterate on real examples; mentors walk the floor"]},
  {title: "Presentations", short: "Demos", min: 30, color: "var(--accent-2)",
   desc: "Two selected teams demo what they built.",
   points: ["Two team demos", "What worked, what didn't", "Wrap-up and next steps"]}
];

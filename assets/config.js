/* ===== Edit event details here. Every page reads from this file. ===== */
const CONFIG = {
  name: "Agentic AI Workshop",
  shortName: "AgentiX",
  host: "ProductSquads",
  start: "2026-10-02T09:30:00+05:30",   // ISO start time, with timezone offset
  end: "2026-10-02T15:00:00+05:30",     // Lunch and close finish time
  timezone: "IST",
  timeZoneId: "Asia/Kolkata",
  venue: "ProductSquads, Ahmedabad",
  city: "Ahmedabad",
  fee: "₹249",
  seats: "50–75",
  cost: "No. There is a nominal registration fee of ₹249, so seats go to people who are serious about attending. You pay it only after the CSQA Team reviews your profile and invites you to register. The fee also helps us plan the logistics carefully and deliver the best possible experience for every attendee.",
  registrationCloses: "2026-09-28",
  registrationOpen: false,
  hashtag: "#AgentiX",
  contactEmail: "csqa.gujarat@gmail.com",
  linkedinUrl: "https://www.linkedin.com/company/csqa/",
  // Google Apps Script web app URL that saves registrations to the Google Sheet (see README).
  formEndpoint: "https://script.google.com/macros/s/AKfycbzsEp4DXprCQZNFb0H7XVwK70rFfQDs9cdQg20pJSWGwMD85G_Q3cPCfCaJkAUxk8Vg/exec",
  // Or send everyone to an external form (Luma, Google Form). Replaces the built-in form.
  externalRegisterUrl: ""
};

const AGENDA = [
  {title: "Refreshments & Meet and Greet", short: "Welcome", min: 30, color: "var(--accent-5)",
   desc: "Arrive, settle in, enjoy refreshments, and connect with fellow participants before the workshop begins.",
   points: ["Registration and refreshments", "Meet fellow participants and the CSQA volunteers"]},
  {title: "Building an Agent & Best Practices", short: "Talk", min: 45, color: "var(--primary)",
   desc: "An expert-led session on the first steps of building an AI agentic solution, covering what an agent is, best practices, Skills, MCPs, and how the pieces fit together.",
   points: ["What an agent is, and when an agentic solution makes sense", "The role of Skills, MCPs, tools, prompts, and context", "Best practices for scoping, designing, and starting your first AI agent"]},
  {title: "Team Forming & Seating", short: "Teams", min: 15, color: "var(--accent)",
   desc: "Meet your CSQA-assigned team, receive the problem statement, and organize the build.",
   points: ["Meet your assigned team", "Receive the team's problem statement", "Ideate and divide responsibilities"]},
  {title: "Build Time", short: "Build", min: 180, color: "var(--accent-4)",
   desc: "Teams apply the same approach to build an agent for a small, practical problem.",
   points: ["Define the agent's job and inputs", "Write a Skill, connect tools through MCP", "Iterate on real examples; mentors walk the floor"]},
  {title: "Team Demos", short: "Demos", min: 30, color: "var(--accent-2)",
   desc: "Two selected teams demo what they built.",
   points: ["Two team demos", "What worked, what didn't", "Wrap-up and next steps"]},
  {title: "Lunch & Farewell", short: "Lunch", min: 30, color: "var(--accent-3)",
   desc: "Close the workshop over a light lunch and conversations with the community.",
   points: ["Light lunch", "Connect with participants, mentors, and the CSQA Team"]}
];

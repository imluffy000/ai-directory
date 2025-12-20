const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Load tools
const tools = JSON.parse(
  fs.readFileSync("./data/tools.json", "utf-8")
);

// Simple AI-like search
app.post("/search", (req, res) => {
  const prompt = req.body.prompt.toLowerCase();

  const words = prompt.split(" ");

  const matched = tools.filter(tool =>
    tool.keywords.some(k => words.includes(k))
  );

  res.json({
    tools: matched.length ? matched : tools
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

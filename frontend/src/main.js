import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container">
    <h1>AI Tool Finder</h1>
    <p class="subtitle">Describe what you want to build</p>

    <div class="search-box">
      <input 
        id="prompt"
        placeholder="I want to design an app..."
      />
      <button id="searchBtn">Search</button>
    </div>

    <div class="examples">
      <span>Design a mobile app</span>
      <span>Create a website</span>
      <span>Generate marketing content</span>
    </div>

    <div id="results" class="results"></div>
  </div>
`

// Dummy data (for UI testing)
const dummyTools = [
  {
    name: "Figma",
    desc: "Design UI/UX for apps and websites",
    tags: ["Design", "UI"],
    rating: "⭐ 4.8"
  },
  {
    name: "Uizard",
    desc: "AI-powered app design from text",
    tags: ["AI", "No-code"],
    rating: "⭐ 4.6"
  },
  {
    name: "Framer",
    desc: "Build websites visually with AI",
    tags: ["Website", "AI"],
    rating: "⭐ 4.7"
  }
]

document.getElementById("searchBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value

  if (!prompt) {
    alert("Please enter something")
    return
  }

  document.getElementById("results").innerHTML = "<p>Searching...</p>"

  const response = await fetch("https://ai-directory-8u0f.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  })

  const data = await response.json()

  showResults(data.tools)
})


function showResults(tools) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  tools.forEach(tool => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <h3>${tool.name}</h3>
        <span class="rating">⭐ ${tool.rating}</span>
      </div>

      <p class="desc">${tool.desc}</p>

      <div class="tags">
        ${tool.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>

      <a href="${tool.url}" target="_blank" class="visit-btn">
        Visit Website →
      </a>
    `;

    resultsDiv.appendChild(card);
  });
}


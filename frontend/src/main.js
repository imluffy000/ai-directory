import "./style.css";

const BACKEND_URL = "https://ai-directory-8u0f.onrender.com";

document.querySelector("#app").innerHTML = `
  <div class="container hero">
    <h1>Find the right AI tool in seconds</h1>
    <p>Search naturally. Discover instantly. Build faster.</p>

    <div class="search-box">
      <input id="promptInput" placeholder="I want to design a mobile app" />
      <button id="searchBtn">Search</button>
    </div>

    <div class="examples">
      <span>Design a mobile app</span>
      <span>Create a website</span>
      <span>Generate marketing content</span>
    </div>

    <div class="steps">
      <div class="step">
        <div class="step-number">01</div>
        <div>
          <h3>Design a mobile app</h3>
          <p>Tell us what you're building. We'll find the tools that work.</p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">02</div>
        <div>
          <h3>Create a website</h3>
          <p>No technical knowledge needed. Just describe your idea.</p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">03</div>
        <div>
          <h3>Generate marketing content</h3>
          <p>Find AI tools built for writers, marketers, and creators.</p>
        </div>
      </div>
    </div>

    <div id="results" class="results"></div>

    <div class="faq">
      <h2>FAQ</h2>
      <div class="faq-item">
        <h4>How does search work?</h4>
        <p>Type what you want to build in plain language.</p>
      </div>
      <div class="faq-item">
        <h4>Are tools free or paid?</h4>
        <p>We list both with clear pricing.</p>
      </div>
    </div>

    <footer>
      © 2025 AI Tool Directory. All rights reserved.
    </footer>
  </div>
`;

document.querySelectorAll(".examples span").forEach(span => {
  span.onclick = () => {
    document.getElementById("promptInput").value = span.innerText;
  };
});

document.getElementById("searchBtn").onclick = async () => {
  const prompt = document.getElementById("promptInput").value.trim();
  const results = document.getElementById("results");

  if (!prompt) return alert("Enter what you want to build");

  results.innerHTML = "<p>Searching...</p>";

  try {
    const res = await fetch(`${BACKEND_URL}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    renderResults(data.tools);
  } catch {
    results.innerHTML = "<p style='color:red'>Server error</p>";
  }
};

function renderResults(tools) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  tools.forEach(t => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="card-header">
        <h3>${t.name}</h3>
        <span class="rating">⭐ ${t.rating}</span>
      </div>
      <p class="desc">${t.desc}</p>
      <div class="tags">
        ${t.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>
      <a class="visit-btn" href="${t.url}" target="_blank">Visit →</a>
    `;
    results.appendChild(div);
  });
}

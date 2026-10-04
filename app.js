// Smart Study Notes Generator - Frontend Application Logic

const SAMPLES = {
  1: {
    title: "AI in Medical Diagnostics and Personalized Care",
    text: "Artificial intelligence is revolutionizing the healthcare sector by providing unprecedented accuracy in early disease diagnosis and treatment planning. Machine learning algorithms, particularly deep neural networks, can analyze complex medical imaging data such as MRI scans, CT scans, and X-rays to detect tumors and subtle tissue abnormalities much faster than traditional radiological methods. Furthermore, predictive analytics systems process longitudinal electronic health records to anticipate patient deterioration, enabling early clinical interventions. By combining genetic profiling with real-time patient vitals, AI systems empower physicians to formulate personalized therapeutic regimens tailored to an individual patient's unique genomic profile, significantly reducing adverse drug reactions and boosting clinical recovery rates."
  },
  2: {
    title: "Transitioning to Renewable Energy Infrastructures",
    text: "The global transition toward renewable energy infrastructures represents the most vital strategy in mitigating the adverse impacts of anthropogenic climate change. Conventional fossil fuel generation emits greenhouse gases such as carbon dioxide and methane, which drive global temperature increases and accelerate extreme weather patterns. In contrast, modern photovoltaic solar arrays and offshore wind turbines harvest inexhaustible natural kinetic energy with zero direct operational greenhouse emissions. However, integrating these intermittent sources into contemporary power grids necessitates high-capacity grid-scale battery storage solutions and intelligent smart grid distribution networks to balance peak energy demand reliably across geographic regions."
  },
  3: {
    title: "Principles and Computational Advantage of Quantum Computing",
    text: "Quantum computing represents a paradigm shift away from classical binary computation by leveraging fundamental principles of quantum mechanics. Classical computers process data encoded strictly as binary bits that exist exclusively in either a zero or one state. Conversely, quantum processors utilize quantum bits, or qubits, which can exist in superpositions of both states simultaneously. When coupled with quantum entanglement—where the state of one qubit is intrinsically linked to another regardless of distance—quantum computers can explore massive combinatorial solution spaces exponentially faster. This extraordinary computational speedup provides transformative solutions for cryptographic decryption, molecular quantum simulations for drug discovery, and large-scale optimization challenges."
  }
};

const inputTextArea = document.getElementById("inputText");
const inputCounter = document.getElementById("inputCounter");
const origWordCountElem = document.getElementById("origWordCount");
const summWordCountElem = document.getElementById("summWordCount");
const reductionRateElem = document.getElementById("reductionRate");
const meterBarElem = document.getElementById("meterBar");
const summaryOutputElem = document.getElementById("summaryOutput");
const keyPointsOutputElem = document.getElementById("keyPointsOutput");
const generateBtn = document.getElementById("generateBtn");

// Word counter helper
function countWords(str) {
  if (!str || !str.trim()) return 0;
  return str.trim().split(/\s+/).length;
}

// Update live character and word counter
function updateInputCounter() {
  const text = inputTextArea.value;
  const words = countWords(text);
  const chars = text.length;
  inputCounter.textContent = `${words} words | ${chars} chars`;
}

inputTextArea.addEventListener("input", updateInputCounter);

// Load preset sample paragraph
function loadSample(id) {
  if (SAMPLES[id]) {
    inputTextArea.value = SAMPLES[id].text;
    updateInputCounter();
    processText();
  }
}

// Clear input
function clearInput() {
  inputTextArea.value = "";
  updateInputCounter();
  summaryOutputElem.textContent = "Your AI-generated summary will appear here once you hit \"Generate Smart Notes\".";
  keyPointsOutputElem.innerHTML = "<li>Key conceptual points and definitions will be bulleted here.</li><li>Ideal for quick exam revision and rapid concept retention.</li>";
  origWordCountElem.textContent = "0";
  summWordCountElem.textContent = "0";
  reductionRateElem.textContent = "0.0%";
  meterBarElem.style.width = "0%";
}

// Advanced Salient Text Summarization Algorithm
function generateSmartSummary(text, maxSentences = 3) {
  const rawSentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  const sentences = rawSentences.map(s => s.trim()).filter(s => s.length > 10);
  
  if (sentences.length <= maxSentences) {
    return text.trim();
  }

  // Frequency mapping
  const stopWords = new Set([
    "the","and","is","in","to","of","it","with","as","for","on","at","by",
    "this","that","from","are","be","an","was","were","has","have","had",
    "been","which","their","more","also","such","when","where","into","than"
  ]);

  const words = text.toLowerCase().match(/\b[a-zA-Z]{3,}\b/g) || [];
  const freq = {};
  words.forEach(w => {
    if (!stopWords.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });

  // Score sentences
  const scored = sentences.map((s, idx) => {
    const sWords = s.toLowerCase().match(/\b[a-zA-Z]{3,}\b/g) || [];
    let score = 0;
    sWords.forEach(w => {
      if (!stopWords.has(w)) score += (freq[w] || 0);
    });
    score = score / (sWords.length + 1);

    // Sentence position bias (intro & conclusion importance)
    if (idx === 0) score *= 1.3;
    if (idx === sentences.length - 1) score *= 1.2;

    return { text: s, score, idx };
  });

  scored.sort((a, b) => b.score - a.score);
  const selected = scored.slice(0, maxSentences).sort((a, b) => a.idx - b.idx);
  
  return selected.map(item => item.text).join(" ");
}

// Extract Key Takeaways
function extractKeyPoints(text, maxPoints = 4) {
  const rawSentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  const sentences = rawSentences.map(s => s.trim()).filter(s => s.length > 15);

  const stopWords = new Set(["the","and","is","in","to","of","it","with","as","for","on","at","by","this","that"]);
  const words = text.toLowerCase().match(/\b[a-zA-Z]{3,}\b/g) || [];
  const freq = {};
  words.forEach(w => { if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1; });

  const scored = sentences.map((s, idx) => {
    const sWords = s.toLowerCase().match(/\b[a-zA-Z]{3,}\b/g) || [];
    let density = 0;
    sWords.forEach(w => { if (!stopWords.has(w)) density += (freq[w] || 0); });
    density = density / (sWords.length + 1);
    return { text: s, density, idx };
  });

  scored.sort((a, b) => b.density - a.density);
  const selected = scored.slice(0, maxPoints).sort((a, b) => a.idx - b.idx);

  return selected.map(item => {
    let clean = item.text.replace(/^(Furthermore|Moreover|In contrast|However|Conversely|Consequently|Additionally|In addition)[,\s]+/i, '');
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
    if (!clean.endsWith('.')) clean += '.';
    return clean;
  });
}

// Process and Generate
function processText() {
  const text = inputTextArea.value.trim();
  if (!text) {
    alert("Please enter or paste a paragraph to summarize.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Analyzing...';

  setTimeout(() => {
    const origWords = countWords(text);
    const summary = generateSmartSummary(text, 3);
    const summWords = countWords(summary);
    
    // Percentage reduction
    let reduction = 0;
    if (origWords > 0) {
      reduction = Math.max(0, (((origWords - summWords) / origWords) * 100)).toFixed(1);
    }

    const keyPoints = extractKeyPoints(text, 4);

    // Update UI
    origWordCountElem.textContent = origWords;
    summWordCountElem.textContent = summWords;
    reductionRateElem.textContent = `${reduction}%`;
    meterBarElem.style.width = `${Math.min(100, Math.max(5, reduction))}%`;
    summaryOutputElem.textContent = summary;

    keyPointsOutputElem.innerHTML = "";
    keyPoints.forEach(point => {
      const li = document.createElement("li");
      li.textContent = point;
      keyPointsOutputElem.appendChild(li);
    });

    generateBtn.disabled = false;
    generateBtn.innerHTML = '<span class="btn-icon">⚡</span> Generate Smart Notes';
  }, 350);
}

// Copy to Clipboard
function copyNotes() {
  const summary = summaryOutputElem.textContent;
  const points = Array.from(keyPointsOutputElem.querySelectorAll("li")).map(li => `• ${li.textContent}`).join("\n");
  const fullText = `SMART STUDY NOTES\n=================\n\nSUMMARY:\n${summary}\n\nKEY TAKEAWAYS:\n${points}\n\nMetrics: Original: ${origWordCountElem.textContent} words | Summary: ${summWordCountElem.textContent} words | Reduction: ${reductionRateElem.textContent}`;

  navigator.clipboard.writeText(fullText).then(() => {
    const copyBtn = document.getElementById("copyBtn");
    const origText = copyBtn.textContent;
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => { copyBtn.textContent = origText; }, 2000);
  });
}

// Download Notes as TXT
function downloadNotes() {
  const summary = summaryOutputElem.textContent;
  const points = Array.from(keyPointsOutputElem.querySelectorAll("li")).map(li => `• ${li.textContent}`).join("\n");
  const content = `SMART STUDY NOTES - GENERATED STUDY NOTES\n=========================================\n\nEXECUTIVE SUMMARY:\n${summary}\n\nKEY TAKEAWAYS:\n${points}\n\n=========================================\nOriginal Word Count : ${origWordCountElem.textContent} words\nSummary Word Count  : ${summWordCountElem.textContent} words\nReduction Rate      : ${reductionRateElem.textContent}\nGenerated via Smart Study Notes Generator\n`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Smart_Study_Notes.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Initialize with sample 1 on startup
window.addEventListener("DOMContentLoaded", () => {
  loadSample(1);
});

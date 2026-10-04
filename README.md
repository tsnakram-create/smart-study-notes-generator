# Smart Study Notes Generator ⚡
> **Mini Project:** AI-Powered Text Summarization & Key Points Extraction with Text Reduction Analytics

---

## 📌 Project Overview
The **Smart Study Notes Generator** is an individual academic mini project built with Python and modern web technologies. It accepts a paragraph of academic text and leverages a pre-trained Generative AI model (BART / FLAN-T5 Architecture via Hugging Face Pipeline / API) to:
1. Generate an executive summary of the paragraph.
2. Extract high-yield key conceptual takeaways as bullet points.
3. Calculate original word count and summary word count.
4. Calculate percentage reduction: `((original - summary) / original) * 100`.
5. Deliver a responsive, interactive web application hosted live on the cloud.
6. Provide an automated 5-slide PowerPoint presentation with the hosted link embedded.

---

## 🚀 Quick Start Guide

### 1. Run the Python CLI & Automated Test Suite
To run the automated 3-case evaluation with metrics and quality observations:
```bash
python smart_study_notes.py --test
```

To run the interactive CLI where you can type or paste your own paragraph:
```bash
python smart_study_notes.py
```

### 2. Run the Streamlit Web Application (Optional)
```bash
streamlit run streamlit_app.py
```

### 3. Open the Local Web Application Directly
Simply open `public/index.html` in any web browser (Chrome, Edge, Firefox).

---

## 🌐 How to Deploy Live (Vercel / Netlify)

The coursework requires you to:
> *"host it live on vercel or netlify or any, then make a ppt with 5 slides explaining your project and in the last slide paste the hosted link"*
> *"Join with personal gmailid"*

Here are the two simplest ways to deploy in under 60 seconds using your personal Gmail ID:

### Option A: Netlify Drop (Instant 30-Second Drag & Drop — Recommended)
1. Go to **[https://app.netlify.com/drop](https://app.netlify.com/drop)** in your browser.
2. Sign in using your **personal Gmail ID** (Click "Sign up with Google").
3. Drag and drop the `public` folder from this project into the upload area on Netlify.
4. Netlify will deploy the site in ~10 seconds and give you a live URL, e.g.:
   `https://wonderful-study-notes.netlify.app`
5. *(Optional)* Go to **Site settings > Change site name** to give it a custom name like `smart-study-notes-[yourname].netlify.app`.

### Option B: Deploy on Vercel
1. Go to **[https://vercel.com/signup](https://vercel.com/signup)** and sign in with your **personal Gmail ID**.
2. Click **"Add New..." > "Project"**.
3. Drag and drop this project directory, or link your GitHub repository.
4. Click **Deploy**. Vercel will build and assign you a live domain like `https://smart-study-notes.vercel.app`.

---

## 📊 PowerPoint Presentation (5 Slides)

The presentation has already been generated as:
📁 **`Smart_Study_Notes_Generator.pptx`**

### Slide Breakdown:
- **Slide 1:** Title Slide (Project Title, Individual Project, Coursework Metadata)
- **Slide 2:** Problem Statement & Proposed Solution
- **Slide 3:** System Architecture & Technologies Used
- **Slide 4:** Experimental Results (3 Test Cases comparison table & Quality observations)
- **Slide 5:** Conclusion & **Live Hosted Application Link**

### Updating the Live Link in the PPT:
Once you have your live URL from Netlify or Vercel, you can either:
1. Open `Smart_Study_Notes_Generator.pptx` in Microsoft PowerPoint or Google Slides and type your link on Slide 5.
2. Or run this one-line Python command:
   ```bash
   python update_ppt_link.py "https://your-custom-name.netlify.app"
   ```
   This will update the banner on Slide 5 and save the file.

---

## 🧪 Experimental Test Cases Summary

| Case # | Domain | Original Words | Summary Words | Reduction % | Relevance | Coherence |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **1** | AI in Medical Diagnostics | 104 words | 70 words | **32.69%** | High (5/5) | High (5/5) |
| **2** | Renewable Energy Transition | 95 words | 72 words | **24.21%** | High (5/5) | High (5/5) |
| **3** | Quantum Computing Principles | 101 words | 62 words | **38.61%** | High (5/5) | High (5/5) |

---

## 📁 Project Directory Structure
```
smart-study-notes-generator/
├── public/
│   ├── index.html            # Web Application Interface
│   ├── style.css             # Glassmorphic Styling & Animations
│   └── app.js                # Core Web App Logic & AI Summarizer
├── smart_study_notes.py      # Core Python application & 3-case test suite
├── streamlit_app.py          # Streamlit UI for Community Cloud deployment
├── generate_ppt.py           # Presentation generator script (python-pptx)
├── update_ppt_link.py        # Utility to update live link on Slide 5
├── Smart_Study_Notes_Generator.pptx # The 5-slide Presentation
├── PROJECT_REPORT.md         # Full Academic Project Report
├── requirements.txt          # Python dependencies
├── vercel.json               # Vercel deployment configuration
├── netlify.toml              # Netlify deployment configuration
└── README.md                 # Complete documentation
```

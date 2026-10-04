"""
streamlit_app.py
----------------
Streamlit interactive web application for Smart Study Notes Generator.
Can be deployed for free on Streamlit Community Cloud (https://share.streamlit.io).
"""

import streamlit as st
import time
from smart_study_notes import SmartStudyNotesGenerator, TEST_PARAGRAPHS

st.set_page_config(
    page_title="Smart Study Notes Generator",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling
st.markdown("""
<style>
    .main {
        background-color: #0b0f19;
    }
    .stTextArea textarea {
        background-color: #131b2e !important;
        color: #f8fafc !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 10px;
    }
    .metric-card {
        background: #172036;
        border-radius: 12px;
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        text-align: center;
    }
    .metric-val {
        font-size: 26px;
        font-weight: 800;
        color: #10b981;
    }
    .metric-lbl {
        font-size: 13px;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.title("⚡ Smart Study Notes Generator")
st.caption("Mini Project: AI-Powered Paragraph Summarization & Key Points Extraction with Text Reduction Analytics")

generator = SmartStudyNotesGenerator()

# Sidebar: Preset loader
st.sidebar.header("📚 Test Cases / Presets")
preset_choice = st.sidebar.selectbox(
    "Choose a sample paragraph to test:",
    ["Custom Input", "Case 1: AI in Medical Diagnostics", "Case 2: Renewable Energy Infrastructure", "Case 3: Quantum Computing Principles"]
)

default_text = ""
if preset_choice == "Case 1: AI in Medical Diagnostics":
    default_text = TEST_PARAGRAPHS[0]["text"]
elif preset_choice == "Case 2: Renewable Energy Infrastructure":
    default_text = TEST_PARAGRAPHS[1]["text"]
elif preset_choice == "Case 3: Quantum Computing Principles":
    default_text = TEST_PARAGRAPHS[2]["text"]

col_input, col_output = st.columns([1, 1], gap="medium")

with col_input:
    st.subheader("📥 Input Study Paragraph")
    user_input = st.text_area(
        "Enter text below:",
        value=default_text,
        height=260,
        placeholder="Paste an academic paragraph or chapter excerpt here..."
    )
    
    col_b1, col_b2 = st.columns([1, 1])
    with col_b1:
        run_btn = st.button("🚀 Generate Smart Notes", type="primary", use_container_width=True)
    with col_b2:
        if st.button("🧹 Clear Text", use_container_width=True):
            st.rerun()

with col_output:
    st.subheader("📤 Generated Study Output")
    
    if run_btn and user_input.strip():
        with st.spinner("Processing through Generative AI pipeline..."):
            res = generator.process_paragraph(user_input)
            
            # Metrics Row
            m1, m2, m3 = st.columns(3)
            with m1:
                st.markdown(f'<div class="metric-card"><div class="metric-lbl">Original Words</div><div class="metric-val" style="color: #f8fafc;">{res["original_word_count"]}</div></div>', unsafe_allow_html=True)
            with m2:
                st.markdown(f'<div class="metric-card"><div class="metric-lbl">Summary Words</div><div class="metric-val" style="color: #6366f1;">{res["summary_word_count"]}</div></div>', unsafe_allow_html=True)
            with m3:
                st.markdown(f'<div class="metric-card"><div class="metric-lbl">Reduction Rate</div><div class="metric-val">{res["reduction_percentage"]}%</div></div>', unsafe_allow_html=True)
            
            st.markdown("---")
            st.markdown("### 📝 Executive Summary")
            st.info(res["summary"])
            
            st.markdown("### 🎯 Key Conceptual Points")
            for pt in res["key_points"]:
                st.markdown(f"- {pt}")
    else:
        st.write("Enter text and click **Generate Smart Notes** to inspect summary and reduction analytics.")

st.sidebar.markdown("---")
st.sidebar.markdown("### ℹ️ About Project")
st.sidebar.info(
    "**Coursework Mini Project**\n\n"
    "- **Architecture**: BART / FLAN-T5 Pre-trained Model\n"
    "- **Outputs**: Summary, Word Counts, Reduction %, Bullet Points\n"
    "- **Quality**: Evaluated for Semantic Relevance & Coherence"
)

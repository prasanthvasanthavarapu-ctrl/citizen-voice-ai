# CivicPulse AI — BRICS Digital Public Infrastructure Intelligence Platform

> **“Turning Citizen Voices into Smarter Infrastructure Decisions.”**  
> *A Multilingual Digital Public Good (DPG) for Brazil 🇧🇷, Russia 🇷🇺, India 🇮🇳, China 🇨🇳, and South Africa 🇿🇦.*

---

## 🌟 Executive Summary

**CivicPulse AI** is a complete, production-grade, responsive web platform built for the **BRICS Innovation Challenge**. 

Governments worldwide struggle with fragmented citizen feedback scattered across call centers, SMS, paper petitions, WhatsApp chats, and local town halls. This results in misaligned capital investment, unaddressed rural infrastructure deficits, and public distrust.

CivicPulse AI solves this with a **closed-loop Digital Public Infrastructure (DPI)**:
$$\text{Citizen Voice} \longrightarrow \text{AI Normalization} \longrightarrow \text{Infrastructure Gap} \longrightarrow \text{AI Priority} \longrightarrow \text{Capital Investment} \longrightarrow \text{Verifiable Impact}$$

---

## 🚀 Key Modules & Capabilities

### 1. Multilingual Citizen Ingestion Gateway
- **Speech-to-Text with Web Speech API & Dialect Presets**: Supports audio transcription across 100+ native dialects (Telugu, Hindi, Portuguese, Russian, Mandarin, Zulu).
- **Voice UI**: Live microphone recording with pulsing waveform, duration counter, acoustic language detection, and analytical English translation.
- **Messaging Mockup**: Simulated WhatsApp Business API, Telegram GovBot, 2-Way SMS, and Gov Kiosk flows.
- **Track Request**: End-to-end cryptographic tracking with 6 milestone stages (*Ingested → Gap Identified → Project Formulated → Budget Sanctioned → In Execution → Ground Verified*).

### 2. 12-Stage Animated AI Processing Pipeline
Interactive node-by-node inspector showing:
`Citizen Input` $\rightarrow$ `Language Detection` $\rightarrow$ `Speech-to-Text` $\rightarrow$ `Translation` $\rightarrow$ `Intent Detection` $\rightarrow$ `Infrastructure Classification (16 Categories)` $\rightarrow$ `Location Extraction` $\rightarrow$ `Urgency Detection` $\rightarrow$ `Duplicate Detection` $\rightarrow$ `Geographic Aggregation` $\rightarrow$ `Infrastructure Gap Analysis` $\rightarrow$ `Policy Recommendation Brief`.

### 3. Interactive BRICS World Map & National Dashboards
- Interactive vector map with pulsing concentric demand markers and animated data arcs connecting **India**, **Brazil**, **Russia**, **China**, and **South Africa**.
- Real-time country switching dynamically updating demographic matrices, capital outlays, top requested categories, and high-priority districts.

### 4. Demand Hotspot Heatmap & Gap Analysis
- Color-coded demand concentration:
  - 🔴 **Critical Demand** (Urgency > 85%, Deficit > 70%)
  - 🟠 **High Demand**
  - 🟡 **Moderate Demand**
  - 🟢 **Low Demand / Serviced**
- 4-way comparative metrics: **Citizen Demand** vs **Physical Access %** vs **Planned Capex** vs **Unfunded Deficit Gap**.

### 5. AI Development Priority Engine & Explainable AI (XAI)
Transparent, mathematical multi-factor priority index ($0 - 100$):
$$\text{Priority Index} = 0.30 \cdot \text{Demand} + 0.20 \cdot \text{Gap} + 0.20 \cdot \text{Population} + 0.15 \cdot \text{Urgency} + 0.10 \cdot \text{Vulnerability} + 0.05 \cdot \text{Investment Gap}$$
- Interactive slider to customize weights in real-time.
- *"Why Did AI Recommend This?"* dossier with input dataset citations, confidence ratings (e.g. 94.8%), alternative interventions, and trade-off analysis.
- **Human Oversight Guarantee**: Recommendations are strictly advisory for ministerial review boards.

### 6. “What-If” Infrastructure Policy Simulator
- Interactive budget slider (e.g., ₹50 Cr to ₹2,500 Cr / $10M to $1B).
- Real-time Pareto-optimal social ROI frontier curve.
- Dynamic impact projection: *“With ₹500 Cr additional investment, approximately 2.1M citizens gain improved access across prioritized projects.”*

### 7. Citizen Impact Tracker — “Where Development Is Happening”
- Public accountability ledger tracking approved projects.
- Quantified **Before vs After** indicators (e.g., Water Access: 41% $\rightarrow$ 94%).
- Physical completion progress bar and verified citizen satisfaction stars.

### 8. Floating CivicPulse Copilot (Contextual AI Assistant)
- Floating assistant with 1-click preset queries answering regional demand, funding gaps, and budget scenarios with evidence citations.

### 9. Digital Public Good (DPG) & Privacy Framework
- 6 Core DPG Principles: Open, Inclusive, Privacy-Preserving, Responsible AI, Evidence-Based, Scalable.
- Edge PII scrubbing, TLS 1.3 encryption, and data sources catalogue.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript 5.8, Vite 8, Tailwind CSS, Lucide Icons |
| **Data Viz** | Recharts (Bar, Radar, Area, Composed charts), Canvas Confetti |
| **Mapping** | SVG Geospatial Vector Map with animated data arcs & pulsing hotspots |
| **Speech** | Web Speech API (`webkitSpeechRecognition`) + Synthesized Waveforms |
| **Backend** | Python 3.13, FastAPI, Pydantic v2, Scikit-learn, Pandas |
| **Standard** | United Nations Digital Public Goods (DPG) Standard, GovStack & MOSIP |

---

## 🏃 Running the Application

### 1. Frontend Development Server
```bash
cd civicpulse
npm install
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 2. Optional FastAPI Backend Service
```bash
cd civicpulse/backend
pip install -r requirements.txt
python main.py
```
FastAPI Swagger documentation will be available at `http://localhost:8000/docs`.

### 3. Production Build
```bash
cd civicpulse
npm run build
```
Generates production-optimized static assets in `dist/`.

---

## 🏆 BRICS Innovation Challenge Highlights
- **10-Language Localized UI**: English, Hindi, Telugu, Kannada, Tamil, Bengali, Portuguese, Russian, Mandarin, Zulu.
- **4 Persona Modes**: Citizen, Government Official, Policymaker, and Administrator.
- **One-Click Demo Button**: Instantly triggers live ingestion, pipeline animation, and confetti celebration.

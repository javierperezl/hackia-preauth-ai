# HackIA – AI Pre-Authorization System

AI-powered medical insurance pre-authorization platform built for the HackIAthon organized by Viamatica.

## Live Demo

https://hackia-preauth-ai.onrender.com

---

## Overview

HackIA automates clinical insurance pre-authorization workflows by analyzing:

- Medical reports
- Insurance policies
- Coverage rules
- Hospital network requirements
- Waiting periods
- Procedure exclusions

The system uses LLM-based reasoning to generate:

- Approval / denial decisions
- Confidence scores
- Transparent reasoning traces
- Audit trail outputs

---

## Features

- PDF upload support
- Free-text medical report analysis
- Insurance policy parsing
- AI-generated authorization decisions
- Confidence scoring
- Live reasoning visualization
- Audit trail timeline
- Notion integration for case storage
- Modern UI with Next.js + Tailwind + shadcn/ui

---

## Tech Stack

### Frontend
- Next.js
- React
- TailwindCSS
- shadcn/ui

### Backend
- FastAPI
- OpenAI API
- PyMuPDF
- Notion API

### Deployment
- Render

---

## Architecture

Frontend:
- Next.js static frontend hosted on Render

Backend:
- FastAPI API service hosted on Render

Flow:
1. Upload medical report + policy
2. Extract text from PDFs
3. Send structured context to the LLM
4. Generate decision + reasoning
5. Store result in Notion

---

## Demo Scenarios

The system can evaluate:

- Covered surgeries
- Waiting period violations
- Cosmetic procedure exclusions
- Out-of-network hospitals
- Emergency overrides
- Experimental procedure denials

---

## Notion Database

Cases are stored and logged in Notion.

Public Database:
[https://www.notion.so/javierperez/HackIA-Surgical-Authorizations-36b22d0b6fa680339e74cf824b2b98c8](https://www.notion.so/javierperez/HackIA-Surgical-Authorizations-36b22d0b6fa680339e74cf824b2b98c8)


---

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
````

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend

```env
OPENAI_API_KEY=your_key
NOTION_API_KEY=your_key
NOTION_DATABASE_ID=your_database_id
```

---

## Production

Frontend:
[https://hackia-preauth-ai.onrender.com](https://hackia-preauth-ai.onrender.com)

Backend:
[https://hackia-preauth-ai-a6dv.onrender.com](https://hackia-preauth-ai-a6dv.onrender.com)

Notion Database:
[https://www.notion.so/javierperez/HackIA-Surgical-Authorizations-36b22d0b6fa680339e74cf824b2b98c8](https://www.notion.so/javierperez/HackIA-Surgical-Authorizations-36b22d0b6fa680339e74cf824b2b98c8)

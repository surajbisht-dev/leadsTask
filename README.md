🚀 Smart Lead Automation System (MERN Stack)

📌 Introduction

The Smart Lead Automation System is a MERN-based automation project that processes batches of names, enriches them using an external API, applies business rules, stores the enriched results in MongoDB Atlas, and automatically syncs verified leads every 5 minutes using a cron job.

This system replicates real-world CRM automation and lead enrichment pipelines.

🛠️ Technologies Used
Frontend

React (Vite)

Tailwind CSS

Axios

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

Axios

Node-cron

dotenv

i18n-iso-countries (country name converter)

🏗️ Project Architecture
backend/
  ├── controllers/
  │     └── leadController.js
  ├── models/
  │     └── Lead.js
  ├── routes/
  │     └── leadRoutes.js
  ├── cronJob/
  │     └── cron.js
  ├── server.js
  └── .env

frontend/
  ├── components/
  │     ├── LeadInput.jsx
  │     └── LeadTable.jsx
  ├── services/api.js
  └── App.jsx

🔄 Project Workflow (Step-by-Step)
1️⃣ Frontend Input

User enters comma-separated names such as:

Peter, Aditi, Ravi


Names are sent to the backend.

2️⃣ Backend Fetches Nationality Predictions

Backend calls:

https://api.nationalize.io?name=NAME


Extracts:

Most probable country

Probability score

3️⃣ Convert Country Code → Full Country Name

Using:

i18n-iso-countries


Conversion examples:

IN → India
US → United States
PK → Pakistan
SD → Sudan


This enhances readability in the final UI.

4️⃣ Apply Business Logic
✔ Verified
probability ≥ 0.6

✔ To Check
probability < 0.6

5️⃣ Save to MongoDB Atlas

Enriched leads are saved in a cloud MongoDB database.

.env contains:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smartlead

6️⃣ Display Leads in Frontend Table

React frontend shows:

Name

Full Country Name

Probability (in %)

Status

Filter buttons (All, Verified, To Check)

7️⃣ Cron Automation (Every 5 Minutes)

Located in:

backend/cronJob/cron.js


Cron job performs:

Finds Verified + Unsynced leads

Logs CRM sync simulation

Updates leads as synced

Ensures a lead is never synced twice (idempotency)

Example output:

Running CRM Sync Job...
[CRM Sync] Sending verified lead Peter to Sales Team...
CRM Sync Completed


During next runs:

Running CRM Sync Job...
CRM Sync Completed


✔ No repeat → Idempotency confirmed.

🌍 API Endpoints
POST /api/leads/process

Used to process a batch of names.

GET /api/leads

Fetch all stored leads (with optional filtering handled in UI).

⚙️ Setup Instructions
Backend
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=<URL>


Start server:

node server.js

Frontend
cd frontend
npm install
npm run dev


Open:

http://localhost:5173

🎯 Conclusion

This project demonstrates:

✔ Batch data ingestion
✔ External API enrichment
✔ Full country name conversion
✔ Business logic classification
✔ Cloud MongoDB storage
✔ Cron-based background automation
✔ Idempotent syncing
✔ Clean MERN architecture

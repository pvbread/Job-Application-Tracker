# 🧠 Job Application Tracker

This project is a personal job application tracker that helps you keep a record of your applications and derive insights over time about which strategies work best.

It features a React frontend and a Node.js + SQLite backend. The frontend fetches and displays data from your local SQLite database through a simple REST API, allowing you to visualize your job hunt and explore trends.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-application-tracker
cd job-application-tracker
```

### 2. Set up the backend

```bash
cd backend
npm install express better-sqlite3 cors
node index.js
```

> The backend will start at `http://localhost:3001` and serve data from your SQLite database.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm start
```

> The frontend will start at `http://localhost:3000` and fetch job application data from the backend.

---

## 🔌 API Endpoint

### `GET /data`

Returns all rows from the job applications table in the SQLite database.

**Example response:**
```json
[
  {
    "id": 1,
    "company": "Etsy",
    "role": "Data Engineer",
    "applied_on": "2024-08-01",
    "status": "Interviewing",
    "response_time": 5
  },
  ...
]
```

---

## 🌱 Wishlist & Future Features

### 🔮 Predictive Features / Machine Learning

- **Response Likelihood Prediction**: Given features like resume version, application time, platform (LinkedIn, referral, etc.), estimate how likely you are to receive a response.
- **Strategy Optimizer**: Learn over time which factors (cover letter, resume tweaks, time of day) most strongly correlate with success.
- **Historical Trends**: Analyze which types of roles, companies, or times of year yield more responses.

### 📊 Visual Insights

- Heatmaps of response times
- Weekly or monthly application trends
- Offer rate by source/platform

### 🧰 Data Management

- Import applications from CSV

---

## 🛠️ Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express (probably pivot to flask)
- **Database**: SQLite3 
- **ML (planned)**: scikit-learn, etc.

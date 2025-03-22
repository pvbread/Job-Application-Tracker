const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/data', (req, res) => {
  const rows = db.prepare('SELECT * FROM job_applications').all();
  res.json(rows);
});

app.post('/api/job-applications', (req, res) => {
    const data = req.body;
  
    const cleanData = {
      ...data,
      isResumeTailored: data.isResumeTailored ? 1 : 0,
      isReferral: data.isReferral ? 1 : 0,
      reachedOutToRecruiter: data.reachedOutToRecruiter ? 1 : 0,
      githubMatchingProject: data.githubMatchingProject ? 1 : 0
    };
  
    const stmt = db.prepare(`
      INSERT INTO job_applications (
        company, isResumeTailored, coverLetterIncluded, isReferral,
        reachedOutToRecruiter, timeSinceApplicationOpened, applicantsAlreadyApplied,
        salaryRangeMidpoint, salaryRequestedMidpoint, companyLocation,
        dateApplied, dateRejected, rejectedAtRound,
        technicalRoundsTaken, behavioralRoundsTaken, notes,
        gptMatchScore, githubMatchingProject
      ) VALUES (
        @company, @isResumeTailored, @coverLetterIncluded, @isReferral,
        @reachedOutToRecruiter, @timeSinceApplicationOpened, @applicantsAlreadyApplied,
        @salaryRangeMidpoint, @salaryRequestedMidpoint, @companyLocation,
        @dateApplied, @dateRejected, @rejectedAtRound,
        @technicalRoundsTaken, @behavioralRoundsTaken, @notes,
        @gptMatchScore, @githubMatchingProject
      )
    `);
  
    try {
      stmt.run(cleanData);
      res.json({ message: 'Inserted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database insert failed' });
    }
  });

app.listen(3001, () => console.log('Server running on http://localhost:3001'));

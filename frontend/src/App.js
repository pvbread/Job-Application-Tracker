import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import JobApplicationForm from './JobApplicationForm';
import InterviewProbabilityStats from './InterviewProbabilityStats';

function Home({ data }) {
  
  // TODO coverLetter mapping not coming out
  
  const columns = [
    { field: 'company', width: 130, headerName: 'Company', flex: 1 },
    { field: 'isResumeTailored', headerName: 'Resume Tailored', width: 130, valueFormatter: (params) => params?.value ? 'Yes' : 'No' },
    { field: 'coverLetterIncluded', headerName: 'Cover Letter', width: 130, valueFormatter: (params) => ['None', 'Template', 'Strong'][params?.value] ?? '' },
    { field: 'isReferral', headerName: 'Referral', width: 100, valueFormatter: (params) => params?.value ? 'Yes' : 'No' },
    { field: 'reachedOutToRecruiter', headerName: 'Reached Recruiter', width: 150, valueFormatter: (params) => params?.value ? 'Yes' : 'No' },
    { field: 'timeSinceApplicationOpened', headerName: 'Days Open', width: 120 },
    { field: 'applicantsAlreadyApplied', headerName: 'Applicants', width: 120 },
    { field: 'salaryRangeMidpoint', headerName: 'Salary Range ($)', width: 140, valueFormatter: (params) => params?.value?.toLocaleString() ?? '' },
    { field: 'salaryRequestedMidpoint', headerName: 'Salary Asked ($)', width: 140, valueFormatter: (params) => params?.value?.toLocaleString() ?? '' },
    { field: 'companyLocation', headerName: 'Location', width: 150 },
    { field: 'dateApplied', headerName: 'Date Applied', width: 130 },
    { field: 'dateRejected', headerName: 'Date Rejected', width: 130 },
    { field: 'rejectedAtRound', headerName: 'Rejected @ Round', width: 150 },
    { field: 'technicalRoundsTaken', headerName: 'Tech Rounds', width: 120 },
    { field: 'behavioralRoundsTaken', headerName: 'Behavioral Rounds', width: 150 },
    { field: 'gptMatchScore', headerName: 'GPT Match', width: 120, valueFormatter: (params) => params?.value?.toFixed(2) ?? '' },
    { field: 'githubMatchingProject', headerName: 'GitHub Match', width: 130, valueFormatter: (params) => params?.value ? 'Yes' : 'No' },
    { field: 'notes', headerName: 'Notes', flex: 2 },
  ];
  
  
  return (
    <Box sx={{ padding: 4 }}>
    <Typography variant="h4" gutterBottom>
      Job Applications
    </Typography>

    <Button component={Link} to="/add" variant="contained" sx={{ marginBottom: 2 }}>
      Add New Application
    </Button>
    <Button component={Link} to="/stats" variant="contained" sx={{ marginBottom: 2 }}>
      See Insights
    </Button>

    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  </Box>
    /*
    <div>
      <h1>SQLite Data</h1>
      <Link to="/add">Add New Application</Link>
      <ul>
        {data.map(row => (
          <li key={row.id}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
    */
  );
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data}/>} />
        <Route path="/add" element={<JobApplicationForm />} />
        <Route path="/stats" element={<InterviewProbabilityStats data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;

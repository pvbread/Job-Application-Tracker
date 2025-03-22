import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobApplicationForm from './JobApplicationForm';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>SQLite Data</h1>
      <Link to="/add">Add New Application</Link>
      <ul>
        {data.map(row => (
          <li key={row.id}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<JobApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;

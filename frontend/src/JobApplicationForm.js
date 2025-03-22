import React, { useState } from 'react';
import axios from 'axios';

const initialForm = {
  company: '',
  isResumeTailored: false,
  coverLetterIncluded: 0,
  isReferral: false,
  reachedOutToRecruiter: false,
  timeSinceApplicationOpened: '',
  applicantsAlreadyApplied: '',
  salaryRangeMidpoint: '',
  salaryRequestedMidpoint: '',
  companyLocation: '',
  dateApplied: '',
  dateRejected: '',
  rejectedAtRound: '',
  technicalRoundsTaken: '',
  behavioralRoundsTaken: '',
  notes: '',
  gptMatchScore: '',
  githubMatchingProject: false,
};

export default function JobApplicationForm() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/job-applications', form);
      alert('Application submitted!');
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      alert('Error submitting application.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '600px' }}>
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />

      <label>
        <input type="checkbox" name="isResumeTailored" checked={form.isResumeTailored} onChange={handleChange} />
        Resume Tailored
      </label>

      <label>
        Cover Letter Included
        <select name="coverLetterIncluded" value={form.coverLetterIncluded} onChange={handleChange}>
          <option value={0}>None</option>
          <option value={1}>Template</option>
          <option value={2}>Tailored</option>
        </select>
      </label>

      <label>
        <input type="checkbox" name="isReferral" checked={form.isReferral} onChange={handleChange} />
        Is Referral
      </label>

      <label>
        <input type="checkbox" name="reachedOutToRecruiter" checked={form.reachedOutToRecruiter} onChange={handleChange} />
        Reached Out To Recruiter
      </label>

      <input type="number" name="timeSinceApplicationOpened" placeholder="Days Since Application Opened" value={form.timeSinceApplicationOpened} onChange={handleChange} />

      <input type="number" name="applicantsAlreadyApplied" placeholder="Applicants Already Applied" value={form.applicantsAlreadyApplied} onChange={handleChange} />

      <input type="number" step="0.01" name="salaryRangeMidpoint" placeholder="Salary Range Midpoint" value={form.salaryRangeMidpoint} onChange={handleChange} />

      <input type="number" step="0.01" name="salaryRequestedMidpoint" placeholder="Salary Requested Midpoint" value={form.salaryRequestedMidpoint} onChange={handleChange} />

      <input name="companyLocation" placeholder="Company Location" value={form.companyLocation} onChange={handleChange} />

      <label>
        Date Applied:
        <input type="date" name="dateApplied" value={form.dateApplied} onChange={handleChange} />
      </label>

      <label>
        Date Rejected:
        <input type="date" name="dateRejected" value={form.dateRejected} onChange={handleChange} />
      </label>

      <input type="number" name="rejectedAtRound" placeholder="Rejected At Round #" value={form.rejectedAtRound} onChange={handleChange} />

      <input type="number" name="technicalRoundsTaken" placeholder="Technical Rounds Taken" value={form.technicalRoundsTaken} onChange={handleChange} />

      <input type="number" name="behavioralRoundsTaken" placeholder="Behavioral Rounds Taken" value={form.behavioralRoundsTaken} onChange={handleChange} />

      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

      <input type="number" step="0.01" name="gptMatchScore" placeholder="GPT Match Score (0.0 - 1.0)" value={form.gptMatchScore} onChange={handleChange} />

      <label>
        <input type="checkbox" name="githubMatchingProject" checked={form.githubMatchingProject} onChange={handleChange} />
        Has GitHub Matching Project
      </label>

      <button type="submit">Submit Application</button>
    </form>
  );
}

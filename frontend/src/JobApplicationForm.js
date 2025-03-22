import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography
} from '@mui/material';

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
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        New Job Application
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ marginBottom: 2 }}>
        Home
      </Button>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company"
              name="company"
              value={form.company}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Cover Letter Included</InputLabel>
              <Select
                name="coverLetterIncluded"
                value={form.coverLetterIncluded}
                label="Cover Letter Included"
                onChange={handleChange}
              >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>Template</MenuItem>
                <MenuItem value={2}>Tailored</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Company Location"
              name="companyLocation"
              value={form.companyLocation}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Salary Range Midpoint"
              name="salaryRangeMidpoint"
              type="number"
              value={form.salaryRangeMidpoint}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Salary Requested Midpoint"
              name="salaryRequestedMidpoint"
              type="number"
              value={form.salaryRequestedMidpoint}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Applicants Already Applied"
              name="applicantsAlreadyApplied"
              type="number"
              value={form.applicantsAlreadyApplied}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Days Since Application Opened"
              name="timeSinceApplicationOpened"
              type="number"
              value={form.timeSinceApplicationOpened}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Date Applied"
              name="dateApplied"
              type="date"
              value={form.dateApplied}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Date Rejected"
              name="dateRejected"
              type="date"
              value={form.dateRejected}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Rejected At Round #"
              name="rejectedAtRound"
              type="number"
              value={form.rejectedAtRound}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Tech Rounds"
              name="technicalRoundsTaken"
              type="number"
              value={form.technicalRoundsTaken}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Behavioral Rounds"
              name="behavioralRoundsTaken"
              type="number"
              value={form.behavioralRoundsTaken}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="GPT Match Score"
              name="gptMatchScore"
              type="number"
              step="0.01"
              value={form.gptMatchScore}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              multiline
              rows={4}
              value={form.notes}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Checkboxes */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isResumeTailored"
                  checked={form.isResumeTailored}
                  onChange={handleChange}
                />
              }
              label="Resume Tailored"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isReferral"
                  checked={form.isReferral}
                  onChange={handleChange}
                />
              }
              label="Is Referral"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="reachedOutToRecruiter"
                  checked={form.reachedOutToRecruiter}
                  onChange={handleChange}
                />
              }
              label="Reached Out To Recruiter"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="githubMatchingProject"
                  checked={form.githubMatchingProject}
                  onChange={handleChange}
                />
              }
              label="GitHub Matching Project"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

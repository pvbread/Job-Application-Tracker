import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function InterviewProbabilityStats({ data }) {
  const strategies = useMemo(() => {
    const defs = [
      {
        label: 'Default',
        test: (row) =>
          !row.isResumeTailored &&
          row.coverLetterIncluded === 0 &&
          !row.isReferral,
      },
      {
        label: 'Tailored Resume',
        test: (row) =>
          row.isResumeTailored &&
          row.coverLetterIncluded === 0 &&
          !row.isReferral,
      },
      {
        label: 'Cover Letter',
        test: (row) =>
          !row.isResumeTailored &&
          row.coverLetterIncluded > 0 &&
          !row.isReferral,
      },
      {
        label: 'Tailored + Cover Letter',
        test: (row) =>
          row.isResumeTailored &&
          row.coverLetterIncluded > 0 &&
          !row.isReferral,
      },
      {
        label: 'Referral Only',
        test: (row) =>
          row.isReferral &&
          !row.isResumeTailored &&
          row.coverLetterIncluded === 0,
      },
      {
        label: 'Referral + Tailor + CL',
        test: (row) =>
          row.isReferral &&
          row.isResumeTailored &&
          row.coverLetterIncluded > 0,
      },
    ];

    return defs.map(({ label, test }) => {
      const subset = data.filter(test);
      const total = subset.length;
      const success = subset.filter(
        (row) => row.technicalRoundsTaken > 0 || row.behavioralRoundsTaken > 0
      ).length;

      return {
        name: label,
        count: total,
        successRate: total > 0 ? Math.round((success / total) * 100) : 0,
      };
    });
  }, [data]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Interview Success by Strategy
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ marginBottom: 2 }}>
        Home
      </Button>

      <Paper sx={{ p: 3 }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={strategies} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-20} textAnchor="end" height={70} />
            <YAxis unit="%" />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="successRate" fill="#1976d2">
              <LabelList dataKey="successRate" position="top" formatter={(v) => `${v}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Success = any technical or behavioral round completed
        </Typography>
      </Paper>
    </Box>
  );
}

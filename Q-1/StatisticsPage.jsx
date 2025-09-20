import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Log from '../middleware/logger';

const StatisticsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Statistics page loaded');
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(storedUrls);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Shortened URL</TableCell>
              <TableCell>Expires On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.length > 0 ? urls.map((url, index) => (
              <TableRow key={index}>
                <TableCell sx={{ wordBreak: 'break-all' }}>{url.originalUrl}</TableCell>
                <TableCell><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></TableCell>
                <TableCell>{url.expiry}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No URLs shortened yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatisticsPage;
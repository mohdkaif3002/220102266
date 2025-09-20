import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import Log from '../middleware/logger';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const [message, setMessage] = useState('Redirecting...');

  useEffect(() => {
    Log('frontend', 'info', 'route', `Redirect attempt for shortcode: ${shortCode}`);
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    const fullShortUrl = `http://localhost:3000/${shortCode}`;
    const match = storedUrls.find(url => url.shortUrl === fullShortUrl);

    if (match) {
      Log('frontend', 'info', 'route', `Redirecting to: ${match.originalUrl}`);
      window.location.href = match.originalUrl;
    } else {
      const msg = 'Short URL not found.';
      setMessage(msg);
      Log('frontend', 'error', 'route', `No match for shortcode: ${shortCode}`);
    }
  }, [shortCode]);

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h5">{message}</Typography>
    </Box>
  );
};

export default RedirectPage;
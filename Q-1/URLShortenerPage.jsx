import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, Alert } from '@mui/material';
import Log from '../middleware/logger';

const URLShortenerPage = () => {
  const [inputs, setInputs] = useState([{ longUrl: '', validity: '', customCode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleAddInput = () => {
    if (inputs.length < 5) {
      Log('frontend', 'info', 'component', 'User added new URL input');
      setInputs([...inputs, { longUrl: '', validity: '', customCode: '' }]);
    } else {
      const msg = 'Cannot add more than 5 URLs at a time.';
      setError(msg);
      Log('frontend', 'warn', 'component', msg);
    }
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index][event.target.name] = event.target.value;
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    setError('');
    setResults([]);
    Log('frontend', 'info', 'component', 'Submit button clicked');

    for (const input of inputs) {
      if (!input.longUrl) {
        const msg = 'URL field cannot be empty.';
        setError(msg);
        Log('frontend', 'error', 'validation', msg);
        return;
      }
    }
    
    Log('frontend', 'info', 'api', 'Starting URL shortening process.');
    const newResults = inputs.map(input => {
      const validity = input.validity || '30';
      const expiryDate = new Date(Date.now() + parseInt(validity) * 60000).toLocaleString();
      const shortCode = input.customCode || Math.random().toString(36).substring(2, 8);
      return {
        originalUrl: input.longUrl,
        shortUrl: `http://localhost:3000/${shortCode}`,
        expiry: expiryDate,
      };
    });

    setResults(newResults);
    const existingData = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    localStorage.setItem('shortenedUrls', JSON.stringify([...existingData, ...newResults]));
    Log('frontend', 'info', 'api', 'Successfully shortened all URLs.');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Shorten URLs</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {inputs.map((input, index) => (
        <Card key={index} sx={{ mb: 2, p: 2 }}>
          <TextField fullWidth label="Original Long URL" name="longUrl" value={input.longUrl} onChange={(e) => handleInputChange(index, e)} margin="normal" required />
          <TextField label="Optional: Validity (minutes)" name="validity" type="number" value={input.validity} onChange={(e) => handleInputChange(index, e)} margin="normal" sx={{ mr: 2 }} />
          <TextField label="Optional: Preferred Shortcode" name="customCode" value={input.customCode} onChange={(e) => handleInputChange(index, e)} margin="normal" />
        </Card>
      ))}
      <Button variant="outlined" onClick={handleAddInput} disabled={inputs.length >= 5}>Add URL</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Generate</Button>

      {results.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Results</Typography>
          {results.map((result, index) => (
            <Card key={index} sx={{ mt: 2, p: 2 }}>
              <Typography><b>Original:</b> {result.originalUrl}</Typography>
              <Typography><b>Shortened:</b> <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">{result.shortUrl}</a></Typography>
              <Typography><b>Expires on:</b> {result.expiry}</Typography>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default URLShortenerPage;
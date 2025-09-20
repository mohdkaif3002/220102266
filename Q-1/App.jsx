import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import URLShortenerPage from './pages/URLShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';
import NavBar from './components/Navbar';
import { Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<URLShortenerPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
          <Route path="/:shortCode" element={<RedirectPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
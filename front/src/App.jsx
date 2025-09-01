import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DevModePanel from './components/DevModePanel';
import Login from './components/Login';
import InitialChoice from './pages/InitialChoice';
import PortfolioView from './pages/PortfolioView'; // Import PortfolioView

// Thematic Loading Indicator
const LoadingIndicator = () => (
  <div className="h-screen flex flex-col items-center justify-center text-green-400 text-4xl font-mono">
    <pre className="animate-pulse">
{`
  _  _ ____ _  _ ____ ____ _  _ ____ 
  |\/| |__| |\ | | __ |___ |\ | |__| 
  |  | |  | | \| |__] |___ | \| |  | 
                                   
`}
    </pre>
    <p className="mt-4">Loading Resources...</p>
  </div>
);

// Thematic Error Display
const ErrorDisplay = ({ message }) => (
  <div className="h-screen flex flex-col items-center justify-center text-red-500 text-4xl font-mono">
    <pre className="animate-bounce">
{`
  ____ ____ _  _ ____ ____ _  _ ____ 
  |__| |  | |\ | | __ |___ |\ | |__| 
  |  | |__| | \| |__] |___ | \| |  | 
                                   
`}
    </pre>
    <p className="mt-4">ERROR: {message}</p>
    <p className="text-xl mt-2">Please check API or use Dev Mode.</p>
  </div>
);

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  // Effect to check for existing token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('supabase.auth.token');
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Function to fetch portfolio data
  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      // No Authorization header for public data fetch

      const [
        personalInfoResponse,
        experienceResponse,
        projectsResponse,
        skillsResponse,
        socialLinksResponse,
        testimonialsResponse,
      ] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/data/personal_info`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/data/experience`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/data/projects`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/data/skills`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/data/social_links`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/data/testimonials`, { headers }),
      ]);

      if (!personalInfoResponse.ok) throw new Error(`HTTP error! status: ${personalInfoResponse.status} for personal_info`);
      if (!experienceResponse.ok) throw new Error(`HTTP error! status: ${experienceResponse.status} for experience`);
      if (!projectsResponse.ok) throw new Error(`HTTP error! status: ${projectsResponse.status} for projects`);
      if (!skillsResponse.ok) throw new Error(`HTTP error! status: ${skillsResponse.status} for skills`);
      if (!socialLinksResponse.ok) throw new Error(`HTTP error! status: ${socialLinksResponse.status} for social_links`);
      if (!testimonialsResponse.ok) throw new Error(`HTTP error! status: ${testimonialsResponse.status} for testimonials`);

      const personal_info = await personalInfoResponse.json();
      const experience = await experienceResponse.json();
      const projects = await projectsResponse.json();
      const skills = await skillsResponse.json();
      const social_links = await socialLinksResponse.json();
      const testimonials = await testimonialsResponse.json();

      setPortfolioData({
        personal_info,
        experience,
        projects,
        skills,
        social_links,
        testimonials,
      });
    } catch (err) {
      setError(err);
      setPortfolioData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (session) => {
    setIsLoggedIn(true);
    setAuthToken(session.access_token);
    localStorage.setItem('supabase.auth.token', session.access_token);
    navigate('/devmode'); // Redirect to devmode after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem('supabase.auth.token');
    setPortfolioData(null); // Clear data on logout
    navigate('/'); // Go back to initial choice on logout
  };

  return (
    <Routes>
      <Route path="/" element={<InitialChoice />} />
      <Route
        path="/portfolio"
        element={
          <PortfolioView
            portfolioData={portfolioData}
            loading={loading}
            error={error}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            navigate={navigate}
            fetchPortfolioData={fetchPortfolioData}
          />
        }
      />
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route
        path="/devmode"
        element={
          isLoggedIn ? (
            <DevModePanel
              authToken={authToken}
              onClose={() => navigate('/portfolio')}
              onLogout={handleLogout}
            />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
    </Routes>
  );
}

export default App;
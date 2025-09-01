import React, { useEffect, useState } from 'react';

import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DevModePanel from './components/DevModePanel'; // New import
import Login from './components/Login'; // Import Login component

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user login status
  const [authToken, setAuthToken] = useState(null); // State for authentication token
  const [currentView, setCurrentView] = useState('initial'); // New state for managing views

  // Effect to check for existing token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('supabase.auth.token');
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
      setCurrentView('portfolio'); 
      fetchData(); // Fetch data immediately if logged in
    } else {
      setLoading(false); // If not logged in, stop loading and show initial view
    }
  }, []);

  // Effect for data fetching
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

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

  const handleSaveDevData = (data) => {
    setPortfolioData(data);
    setLoading(false);
    setError(null); // Clear any previous errors
    setCurrentView('portfolio'); // After saving, go back to portfolio view
  };

  const handleLoginSuccess = (session) => {
    setIsLoggedIn(true);
    setAuthToken(session.access_token);
    localStorage.setItem('supabase.auth.token', session.access_token);
    setCurrentView('devmode'); // Redirect to devmode after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem('supabase.auth.token');
    setPortfolioData(null); // Clear data on logout
    setLoading(false);
    setCurrentView('initial'); // Go back to initial view on logout
  };

  // Conditional rendering based on currentView
  if (currentView === 'initial') {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-green-400 text-4xl font-mono">
        <MatrixBackground />
        <h1 className="text-6xl mb-8 animate-pulse">Welcome</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('login')}
            className="px-8 py-4 bg-blue-700 text-white rounded hover:bg-blue-500 text-2xl"
          >
            Dev Mode
          </button>
          <button
            onClick={() => {
              setCurrentView('portfolio');
              fetchData();
            }}
            className="px-8 py-4 bg-green-700 text-white rounded hover:bg-green-500 text-2xl"
          >
            View Portfolio
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-green-400 text-4xl font-mono">
        <button
          onClick={() => setCurrentView('initial')}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
        >
          Back
        </button>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  if (loading && currentView === 'portfolio') { // Show loading only if in portfolio view and loading
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  if (currentView === 'devmode') {
    if (!isLoggedIn) {
      // If somehow in devmode view without being logged in, redirect to login
      setCurrentView('login');
      return null; // Or a loading indicator while redirecting
    }
    return (
      <>
        <button
          onClick={() => setCurrentView('portfolio')}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
        >
          Back
        </button>
        <DevModePanel onClose={() => setCurrentView('portfolio')} onSave={handleSaveDevData} authToken={authToken} />
        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-500"
        >
          Logout
        </button>
      </>
    );
  }

  if (currentView === 'portfolio') {
    // If no data and in portfolio view, it means fetch failed or returned empty
    if (!portfolioData) {
      return <ErrorDisplay message="No data loaded. API might be down or empty." />;
    }

    return (
      <>
        <MatrixBackground />
        <main className="relative z-10">
          <button
            onClick={() => setCurrentView('initial')}
            className="fixed top-4 left-4 z-50 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
          >
            Back
          </button>
          {/* Dev Mode Toggle Button */}
          <button
            onClick={() => {
              if (isLoggedIn) {
                setCurrentView('devmode');
              } else {
                setCurrentView('login');
              }
            }}
            className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500"
          >
            {isLoggedIn ? 'Dev Mode' : 'Login for Dev Mode'}
          </button>

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="fixed top-4 right-36 z-50 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-500"
            >
              Logout
            </button>
          )}

          <Hero personalInfo={portfolioData.personal_info} />
          <Experience experience={portfolioData.experience} />
          <Projects projects={portfolioData.projects} />
          <Skills skills={portfolioData.skills} />
          <Testimonials testimonials={portfolioData.testimonials} />
          <Contact socialLinks={portfolioData.social_links} />
          <Footer />
        </main>
      </>
    );
  }

  return null; // Should not reach here
}

export default App;
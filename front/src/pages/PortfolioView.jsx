import React, { useEffect } from 'react';
import MatrixBackground from '../components/MatrixBackground';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

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

const PortfolioView = ({ portfolioData, loading, error, isLoggedIn, handleLogout, navigate, fetchPortfolioData }) => {
  useEffect(() => {
    fetchPortfolioData();
  }, []); // Fetch data when component mounts

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  if (!portfolioData) {
    return <ErrorDisplay message="No data loaded. API might be down or empty." />;
  }

  return (
    <>
      <MatrixBackground />
      <main className="relative z-10">
        <button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
        >
          Back to Home
        </button>
        {/* Dev Mode Toggle Button */}
        <button
          onClick={() => {
            if (isLoggedIn) {
              navigate('/devmode');
            } else {
              navigate('/login');
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
};

export default PortfolioView;
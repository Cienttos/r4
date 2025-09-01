import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DevModePanel from "./components/DevModePanel";
import Login from "./components/Login";
import InitialChoice from "./pages/InitialChoice";
import PortfolioView from "./pages/PortfolioView";

// Indicador de carga
const LoadingIndicator = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-green-400 text-4xl font-mono p-4">
    <p className="animate-pulse text-center text-2xl md:text-4xl font-bold">
      Cargando recursos...
    </p>
  </div>
);

// Pantalla de error
const ErrorDisplay = ({ message }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-red-500 text-4xl font-mono p-4">
    <p className="animate-bounce text-center text-2xl md:text-4xl font-bold">
      ERROR
    </p>
    <p className="mt-4 text-lg md:text-xl">{message}</p>
    <p className="text-base md:text-lg mt-2">
      Por favor, verifica la API o usa el modo de desarrollo.
    </p>
  </div>
);

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("supabase.auth.token");
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = { "Content-Type": "application/json" };

      const [
        personalInfoResponse,
        experienceResponse,
        projectsResponse,
        skillsResponse,
        socialLinksResponse,
        testimonialsResponse,
      ] = await Promise.all([
        fetch(`https://r4-seven-one.vercel.app/api/data/personal_info`, {
          headers,
        }),
        fetch(`https://r4-seven-one.vercel.app/api/data/experience`, {
          headers,
        }),
        fetch(`https://r4-seven-one.vercel.app/api/data/projects`, { headers }),
        fetch(`https://r4-seven-one.vercel.app/api/data/skills`, { headers }),
        fetch(`https://r4-seven-one.vercel.app/api/data/social_links`, {
          headers,
        }),
        fetch(`https://r4-seven-one.vercel.app/api/data/testimonials`, {
          headers,
        }),
      ]);

      if (!personalInfoResponse.ok)
        throw new Error(
          `Error HTTP ${personalInfoResponse.status} para personal_info`
        );
      if (!experienceResponse.ok)
        throw new Error(
          `Error HTTP ${experienceResponse.status} para experience`
        );
      if (!projectsResponse.ok)
        throw new Error(`Error HTTP ${projectsResponse.status} para projects`);
      if (!skillsResponse.ok)
        throw new Error(`Error HTTP ${skillsResponse.status} para skills`);
      if (!socialLinksResponse.ok)
        throw new Error(
          `Error HTTP ${socialLinksResponse.status} para social_links`
        );
      if (!testimonialsResponse.ok)
        throw new Error(
          `Error HTTP ${testimonialsResponse.status} para testimonials`
        );

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
      setError(err.message);
      setPortfolioData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (session) => {
    setIsLoggedIn(true);
    setAuthToken(session.access_token);
    localStorage.setItem("supabase.auth.token", session.access_token);
    navigate("/devmode");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem("supabase.auth.token");
    setPortfolioData(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-mono">
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
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/devmode"
          element={
            isLoggedIn ? (
              <DevModePanel
                authToken={authToken}
                onClose={() => navigate("/")}
                onLogout={handleLogout}
              />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

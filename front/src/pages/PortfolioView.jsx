import React, { useEffect } from 'react';
import MatrixBackground from '../components/MatrixBackground';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// Indicador de carga temático
const LoadingIndicator = () => (
  <div className="h-screen flex flex-col items-center justify-center text-green-400 text-4xl font-mono bg-black">
    <p className="mt-4 text-2xl font-pixel animate-pulse-green">Cargando recursos...</p>
  </div>
);

// Pantalla de error temática
const ErrorDisplay = ({ message }) => (
  <div className="h-screen flex flex-col items-center justify-center text-red-600 text-4xl font-mono bg-black animate-shake">
    <p className="mt-4 text-2xl font-pixel">ERROR: {message}</p>
    <p className="text-xl mt-2 text-gray-400 font-mono">Por favor revisa la API o utiliza el Modo Desarrollador.</p>
  </div>
);

const PortfolioView = ({
  portfolioData,
  loading,
  error,
  isLoggedIn,
  handleLogout,
  navigate,
  fetchPortfolioData
}) => {
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!portfolioData) return <ErrorDisplay message="No se cargaron datos. La API podría estar caída o vacía." />;

  return (
    <section className="relative w-full min-h-screen overflow-x-hidden font-mono">
      {/* Fondo Matrix global */}
      <MatrixBackground />

      {/* Botón volver al inicio */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 px-6 py-3 bg-black/80 text-green-400 rounded border-2 border-green-500 font-pixel hover:shadow-green-glow hover:bg-black/90 transition-all duration-300"
      >
        Volver al inicio
      </button>

      {/* Main con secciones más cercanas */}
      <main className="relative z-10 flex flex-col space-y-12 md:space-y-16 px-4 md:px-12">
        <Hero personalInfo={portfolioData.personal_info} />
        <Experience experience={portfolioData.experience} />
        <Projects projects={portfolioData.projects} />
        <Skills skills={portfolioData.skills} />
        <Testimonials testimonials={portfolioData.testimonials} />
        <Contact socialLinks={portfolioData.social_links} />
        <Footer />
      </main>
    </section>
  );
};

export default PortfolioView;

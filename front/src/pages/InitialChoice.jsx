import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixBackground from '../components/MatrixBackground';

const InitialChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-green-400 text-4xl font-mono">
      <MatrixBackground />
      <h1 className="text-6xl mb-8 animate-pulse">Welcome</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-4 bg-blue-700 text-white rounded hover:bg-blue-500 text-2xl"
        >
          Dev Mode
        </button>
        <button
          onClick={() => navigate('/portfolio')}
          className="px-8 py-4 bg-green-700 text-white rounded hover:bg-green-500 text-2xl"
        >
          View Portfolio
        </button>
      </div>
    </div>
  );
};

export default InitialChoice;
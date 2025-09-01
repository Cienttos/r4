import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error || 'Login failed'}`);
      } else if (data.user) {
        setMessage('Logged in successfully!');
        onLoginSuccess(data.session);
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login fetch error:', error);
      setMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-green-400">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-green-500">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to Matrix Portfolio</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
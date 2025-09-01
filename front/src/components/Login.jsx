import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // 'success', 'error', 'info'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("info");

    try {
      const response = await fetch(
        "https://r4-seven-one.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error || "Error al iniciar sesión"}`);
        setMessageType("error");
      } else if (data.user) {
        setMessage("¡Inicio de sesión exitoso!");
        setMessageType("success");
        onLoginSuccess(data.session);
      } else {
        setMessage("No se pudo iniciar sesión. Verifica tus credenciales.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      setMessage("Ocurrió un error inesperado.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/90 text-green-400 p-8 rounded-lg shadow-2xl border border-green-500 w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-16 animate-fade-in-up">
      <h2 className="text-green-400 text-3xl sm:text-2xl font-pixel mb-6 text-center transition-all duration-300 hover:animate-glitch">
        Iniciar sesión en Modo Desarrollador
      </h2>

      <form
        onSubmit={handleLogin}
        className="space-y-6 p-6 border-2 border-green-500 rounded-lg animate-border-pulse"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-green-400 text-sm font-mono mb-2"
          >
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu.correo@ejemplo.com"
            className="bg-black/80 text-green-400 border border-green-700 p-3 rounded w-full focus:outline-none focus:border-green-400 placeholder-green-600 transition-all duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-green-400 text-sm font-mono mb-2"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            className="bg-black/80 text-green-400 border border-green-700 p-3 rounded w-full focus:outline-none focus:border-green-400 placeholder-green-600 transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-600 text-white font-pixel py-3 px-6 rounded transition-all duration-300 ease-in-out border border-green-500 w-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-green-glow"
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-800 hover:bg-gray-700 text-white font-pixel py-3 px-6 rounded transition-all duration-300 ease-in-out border border-gray-500 w-full mt-4 hover:shadow-green-glow"
        >
          Volver
        </button>
      </form>

      {message && (
        <p
          className={`mt-6 text-center text-lg font-mono ${
            messageType === "error" ? "text-red-500" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;

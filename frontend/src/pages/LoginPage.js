import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const data = await loginUser(email, password);

    localStorage.setItem("token", data.access_token);

    navigate("/projects");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="bg-white p-8 rounded-xl shadow w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />

        <button
          onClick={login}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

        {/* REGISTER LINK */}

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}
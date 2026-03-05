import { useState } from "react";
import { registerUser } from "../api/api";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

  const res = await registerUser(email, password);

  if (res.error) {
    alert(res.error);
    return;
  }

  alert("Account created successfully. Please login.");
  window.location.href = "/";

  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-2xl mb-4">Register</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-2"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4"
        />

        <button
          onClick={register}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Register
        </button>

      </div>

    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import api from "../services/api";
import { useStudent } from "../context/StudentContext";

function Login() {
  const navigate = useNavigate();
  const { setStudent } = useStudent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("student", JSON.stringify(response.data.student));
      setStudent(response.data.student);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Unable to sign in right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.22),transparent_55%)] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-300/50 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to your learning twin</h1>
        <p className="mt-2 text-sm text-slate-600">Pick up where your brain left off and continue your adaptive journey.</p>

        {error ? (
          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="mt-6 space-y-3">
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
          {isLoading ? "Signing in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          New here?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

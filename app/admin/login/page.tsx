"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ADMIN_EMAIL = "hamidmiaff@gmail.com";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "unauthorized") {
      setError("This account is not authorized to access the admin panel.");
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError("This account is not authorized to access the admin panel.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError("Unable to sign in. Check your email and password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleLogin} className="card w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-white">Admin Login</h1>
        <p className="text-sm text-slate-400">
          Sign in to manage your portfolio.
        </p>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={loading} className="btn w-full disabled:opacity-50">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <a href="/" className="block text-center text-sm text-slate-500 hover:text-accent">
          ← Back to website
        </a>
      </form>
    </div>
  );
}

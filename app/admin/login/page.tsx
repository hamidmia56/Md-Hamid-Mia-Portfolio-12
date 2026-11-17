"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ADMIN_EMAIL = "hamidmiaff@gmail.com";
const PASSWORD_RESET_REDIRECT = "https://mdhamidmia.vercel.app/auth/confirm?next=/admin/reset-password";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "unauthorized") {
      setError("This account is not authorized to access the admin panel.");
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");

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

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError("Enter the authorized Admin email address.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(ADMIN_EMAIL, {
      redirectTo: PASSWORD_RESET_REDIRECT,
    });

    setLoading(false);
    if (error) {
      setError(error.status === 429
        ? "Too many reset requests. Please wait before requesting another email."
        : "Could not send the reset email. Please try again later.");
      return;
    }

    setNotice("If this Admin account is eligible, a password reset link has been sent. Check your inbox and spam folder.");
  }

  function switchMode(next: "login" | "forgot") {
    setMode(next);
    setError("");
    setNotice("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <form
        onSubmit={mode === "login" ? handleLogin : handleForgotPassword}
        className="card w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-white">
          {mode === "login" ? "Admin Login" : "Reset Admin Password"}
        </h1>
        <p className="text-sm text-slate-400">
          {mode === "login"
            ? "Sign in to manage your portfolio."
            : "Enter your Admin email to receive a secure password reset link."}
        </p>
        <div>
          <label htmlFor="email" className="label">Admin Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your Admin email"
          />
        </div>
        {mode === "login" && (
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <div className="mt-2 text-right">
              <button type="button" onClick={() => switchMode("forgot")} className="text-sm text-accent hover:underline">
                Forgot Password?
              </button>
            </div>
          </div>
        )}
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        {notice && <p role="status" className="text-sm text-emerald-400">{notice}</p>}
        <button type="submit" disabled={loading} className="btn w-full disabled:opacity-50">
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Sign In"
              : "Send Reset Link"}
        </button>
        {mode === "forgot" && (
          <button type="button" onClick={() => switchMode("login")} className="w-full text-sm text-slate-400 hover:text-white">
            ← Back to Login
          </button>
        )}
        <a href="/" className="block text-center text-sm text-slate-500 hover:text-accent">
          ← Back to website
        </a>
      </form>
    </div>
  );
}

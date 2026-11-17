"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ADMIN_EMAIL = "hamidmiaff@gmail.com";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    createClient().auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
        setError("This password reset link is invalid or expired. Request a new link.");
      }
      setReady(true);
    });
    return () => { active = false; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 12) {
      setError("Use a password with at least 12 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: userError } = await supabase.auth.getUser();

    if (userError || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
      setError("Your reset session is invalid or expired. Request a new link.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError("Could not update the password. Please request a new reset link.");
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    router.replace("/admin/login?password-reset=success");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-white">Set New Password</h1>
        <p className="text-sm text-slate-400">Choose a strong password for your Admin account.</p>
        {!ready ? (
          <p className="text-sm text-slate-400">Verifying your secure reset link...</p>
        ) : (
          <>
            <div>
              <label htmlFor="new-password" className="label">New Password</label>
              <input id="new-password" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            </div>
            <div>
              <label htmlFor="confirm-password" className="label">Confirm New Password</label>
              <input id="confirm-password" type="password" autoComplete="new-password" minLength={12} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input" />
            </div>
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading || !!error} className="btn w-full disabled:opacity-50">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        )}
        <a href="/admin/login" className="block text-center text-sm text-slate-500 hover:text-accent">← Back to Login</a>
      </form>
    </div>
  );
}

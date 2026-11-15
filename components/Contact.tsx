"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Contact({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("messages").insert({
        name: String(data.name || ""),
        email: String(data.email || ""),
        subject: String(data.subject || ""),
        message: String(data.message || ""),
      });
      if (error) throw error;
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section">
      <h2 className="section-title">
        Get In <span>Touch</span>
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-4 text-slate-400">
            Have a project in mind or just want to say hi? Fill the form and
            I&apos;ll get back to you soon.
          </p>
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-accent hover:underline"
            >
              {email}
            </a>
          )}
        </div>
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label htmlFor="name" className="label">
              Name
            </label>
            <input id="name" name="name" required className="input" />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="subject" className="label">
              Subject
            </label>
            <input id="subject" name="subject" className="input" />
          </div>
          <div>
            <label htmlFor="message" className="label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="input"
            />
          </div>
          <button type="submit" disabled={status === "sending"} className="btn w-full disabled:opacity-50">
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "Message Sent ✓"
                : "Send Message"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-green-400">
              Thanks! Your message has been received.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

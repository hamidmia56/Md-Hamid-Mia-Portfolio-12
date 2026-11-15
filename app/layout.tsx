import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.seo_title || settings.full_name,
    description: settings.seo_description || settings.bio,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" style={{ ["--accent" as string]: settings.accent_color }}>
      <body>{children}</body>
    </html>
  );
}

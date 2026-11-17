export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon_url: string;
}

export interface SiteSettings {
  id: number;
  full_name: string;
  headline: string;
  bio: string;
  about_text: string;
  email: string;
  phone: string;
  location: string;
  resume_url: string;
  avatar_url: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  facebook_url: string;
  tiktok_url: string;
  youtube_url: string;
  whatsapp_url: string;
  social_links: SocialLink[];
  accent_color: string;
  seo_title: string;
  seo_description: string;
  updated_at?: string;
}

export interface Project {
  id: number; title: string; description: string; image_url: string;
  tags: string[]; live_url: string; repo_url: string; featured: boolean;
  sort_order: number; created_at?: string;
}
export interface Skill { id: number; name: string; category: string; level: number; sort_order: number; }
export interface Experience { id: number; role: string; company: string; description: string; start_date: string; end_date: string; is_current: boolean; sort_order: number; }
export interface Testimonial { id: number; name: string; role: string; quote: string; sort_order: number; }
export interface Message { id: number; name: string; email: string; subject: string; message: string; is_read: boolean; created_at: string; }

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1, full_name: "Your Name", headline: "Full Stack Developer",
  bio: "Write a short intro about yourself here.",
  about_text: 'Write a longer "About Me" text here from the admin panel.',
  email: "you@example.com", phone: "", location: "", resume_url: "",
  avatar_url: "", github_url: "", linkedin_url: "", twitter_url: "",
  instagram_url: "", facebook_url: "", tiktok_url: "", youtube_url: "",
  whatsapp_url: "",
  social_links: [
    { id: "facebook", platform: "facebook", label: "Facebook", url: "", icon_url: "" },
    { id: "youtube", platform: "youtube", label: "YouTube", url: "", icon_url: "" },
    { id: "tiktok", platform: "tiktok", label: "TikTok", url: "", icon_url: "" },
    { id: "whatsapp", platform: "whatsapp", label: "WhatsApp", url: "", icon_url: "" },
    { id: "instagram", platform: "instagram", label: "Instagram", url: "", icon_url: "" },
    { id: "twitter", platform: "twitter", label: "Twitter / X", url: "", icon_url: "" },
    { id: "linkedin", platform: "linkedin", label: "LinkedIn", url: "", icon_url: "" },
    { id: "telegram", platform: "telegram", label: "Telegram", url: "", icon_url: "" },
  ],
  accent_color: "56 189 248", seo_title: "My Portfolio",
  seo_description: "Personal portfolio website",
};

import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_SETTINGS,
  Experience,
  Project,
  SiteSettings,
  Skill,
  Testimonial,
} from "@/lib/types";

export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    return (data as SiteSettings) ?? DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data as Project[]) ?? [];
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data as Skill[]) ?? [];
  } catch {
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data as Experience[]) ?? [];
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data as Testimonial[]) ?? [];
  } catch {
    return [];
  }
}

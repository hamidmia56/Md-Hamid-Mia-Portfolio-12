import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "hamidmiaff@gmail.com";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const requestedNext = url.searchParams.get("next");
  const next = requestedNext === "/admin/reset-password"
    ? requestedNext
    : "/admin/login";

  if (!code) {
    return NextResponse.redirect(new URL("/admin/login?error=reset-link-invalid", url.origin));
  }

  const supabase = createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(new URL("/admin/login?error=reset-link-invalid", url.origin));
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/login?error=unauthorized", url.origin));
  }

  return NextResponse.redirect(new URL(next, url.origin));
}

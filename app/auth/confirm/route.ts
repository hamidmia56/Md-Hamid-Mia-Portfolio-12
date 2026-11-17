import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "hamidmiaff@gmail.com";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const requestedNext = url.searchParams.get("next");
  const next = requestedNext === "/admin/reset-password"
    ? requestedNext
    : "/admin/login";

  if (!tokenHash || type !== "recovery") {
    return NextResponse.redirect(
      new URL("/admin/login?error=reset-link-invalid", url.origin)
    );
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "recovery",
  });

  if (error || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/admin/login?error=reset-link-invalid", url.origin)
    );
  }

  return NextResponse.redirect(new URL(next, url.origin));
}

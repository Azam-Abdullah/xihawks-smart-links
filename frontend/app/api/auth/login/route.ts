import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Call your backend
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await backendRes.json();

  if (!backendRes.ok || !data.success) {
    return NextResponse.json({ success: false, message: data.message || "Login failed" }, { status: 401 });
  }

  // ✅ Set secure HttpOnly cookie
  const response = NextResponse.json({ success: true, user: data.user });
  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}

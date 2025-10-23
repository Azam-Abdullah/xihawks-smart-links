import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  // Forward signup to your backend Node API
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await backendRes.json();

  if (!backendRes.ok || !data.success) {
    return NextResponse.json(
      { success: false, message: data.message || "Signup failed" },
      { status: 400 }
    );
  }

  // ✅ Set HttpOnly cookie with token
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

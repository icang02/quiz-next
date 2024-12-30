import { NextRequest, NextResponse } from "next/server";
import axiosApi from "./lib/axios";

export async function middleware(request: NextRequest) {
  // Extract pathname from request URL
  const { pathname } = request.nextUrl;

  // Define dynamic patterns based on matcher configuration
  const ujianPattern = /^\/ujian\/(\d+)$/;
  const skorPattern = /^\/ujian\/(\d+)\/skor$/;

  // Attempt to extract `attemptId` from the pathname
  let attemptId =
    pathname.match(skorPattern)?.[1] || pathname.match(ujianPattern)?.[1];

  // Check time exam is done or not
  const response = await axiosApi(`/attempt/${attemptId}`);
  const attempt = response.data.data;
  let status = attempt.status;

  // Update status if time exam is end
  if (new Date(attempt.end_time).getTime() <= new Date().getTime()) {
    const res = await axiosApi.post("ujian/status/update", { attemptId });
    status = res.data.data.status;
  }

  if (skorPattern.test(pathname)) {
    if (!status) {
      return NextResponse.redirect(new URL(`/ujian/${attemptId}`, request.url));
    }
  } else if (ujianPattern.test(pathname)) {
    if (status) {
      return NextResponse.redirect(
        new URL(`/ujian/${attemptId}/skor`, request.url)
      );
    }
  }
}

// Config matcher to specify which routes to apply middleware
export const config = {
  matcher: ["/ujian/:attemptId", "/ujian/:attemptId/skor"],
};
// new Date(attempt.end_time).getTime() <= new Date().getTime();

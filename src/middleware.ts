import { NextResponse } from "next/server";

export default async function middleware() {
  const res = NextResponse.next();

  return res;
}

export const config = {
  // matcher: [], // paths to run middleware on
};

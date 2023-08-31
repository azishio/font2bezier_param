import { NextResponse } from "next/server";
import { unicodeBlocks } from "../../../data/unicodeBlocks";

export async function GET(req: Request) {
  const validToken = "hoge";

  if (!req.headers.has("authorization"))
    return new Response(null, {
      status: 401,
      headers: { "WWW-Authenticate": 'Bearer realm="token_required"' },
    });
  if (req.headers.get("authorization") !== `Bearer ${validToken}`)
    return new Response(null, {
      status: 401,
      headers: { "WWW-Authenticate": 'Bearer realm="invalid_token"' },
    });
  return NextResponse.json(unicodeBlocks, {
    status: 200,
    headers: { "WWW-Authenticate": 'Bearer realm=""' },
  });
}

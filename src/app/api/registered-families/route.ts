import { NextResponse } from "next/server";
import Connection from "../../../db/connection";

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

  const result = await new Connection()
    .registeredFamilies()
    .then((v) => (v[0] as { family_name: string }[]).map((V) => V.family_name));
  return NextResponse.json(result, {
    status: 200,
    headers: { "WWW-Authenticate": 'Bearer realm=""' },
  });
}

import { NextResponse } from "next/server";
import Connection from "../../../db/connection";

export async function POST(req: Request) {
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

  const {
    fontFamily,
    unicodes,
  }: { fontFamily: string | undefined; unicode: number[] | undefined } =
    await req.json();

  console.log(fontFamily, unicodes);

  const result = await new Connection()
    .findByFamilyAndUnicodes(fontFamily!, unicodes!)
    .then((v) => v[0])
    .then((v) =>
      v.map((V) => ({ unicode: V.unicode, block: V.block, data: V.data })),
    );

  return NextResponse.json(result, {
    status: 200,
    headers: { "WWW-Authenticate": 'Bearer realm=""' },
  });
}

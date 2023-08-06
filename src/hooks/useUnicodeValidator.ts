import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { isValidUnicode } from "../components/Editor/unicode/check";

const useUnicodeValidator = () => {
  const router = useRouter();
  const code = useRef<number | null>(null);
  useEffect(() => {
    const { unicode, fontFamily } = router.query;

    if (typeof unicode !== "string" || !isValidUnicode(unicode))
      router.push(`/edit/${fontFamily}/GlyphNotFound`);
    else code.current = Number.parseInt(unicode, 10);
  }, [router]);

  return code.current!;
};
export default useUnicodeValidator;

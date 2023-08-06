import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useFontFamilyValidator = (): string => {
  const router = useRouter();
  const family = useRef<string | null>(null);
  useEffect(() => {
    // TODO useContextで配信されるfontListからフォントを拾って照査する
    const isValidFamily = true;

    const { familyName } = router.query;
    if (typeof familyName !== "string" || !isValidFamily)
      router.push("/edit/FontFamilyNotFound");
    else family.current = familyName;
  }, [router]);

  return family.current!;
};

export default useFontFamilyValidator;

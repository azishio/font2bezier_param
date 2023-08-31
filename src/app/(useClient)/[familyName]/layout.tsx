"use client";

import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import LocalFontAccessAPIPermissionDialog from "./_components/LocalFontAccessAPIPermissionDialog";

export default function FontFamilyValidator({
  children,
}: {
  children: ReactNode;
}) {
  const searchParams = useSearchParams();
  const familyName = searchParams.get("familyName")!;

  console.log("lode temp");

  return (
    <div style={{ display: "contents" }}>
      <LocalFontAccessAPIPermissionDialog />
      {children}
    </div>
  );
}

import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Font2BezierParam",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className="light">
      <body>{children}</body>
    </html>
  );
}

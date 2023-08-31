"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </ChakraProvider>
  );
}

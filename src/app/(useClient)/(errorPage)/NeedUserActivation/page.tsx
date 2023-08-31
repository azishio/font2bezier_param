"use client";

import { Code, Divider, Heading, Text, VStack } from "@chakra-ui/react";

export default function InvalidUnicode() {
  return (
    <VStack>
      <Heading>User activation is needed.</Heading>
      <Divider />
      <Text>
        ブラウザにローカルフォントへのアクセスを許可する必要があります。
      </Text>
      <Heading as="h2">Chromeの場合</Heading>
      <Text>
        <Code>設定</Code> {">"} <Code>プライバシーとセキュリティ</Code> {"> "}
        <Code>サイトの設定</Code> {">"} <Code>azishio.com</Code> {"> "}
        <Code>フォント</Code>　を<Code>許可する</Code>に変更してください
      </Text>
    </VStack>
  );
}

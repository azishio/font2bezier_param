"use client";

import {
  Divider,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

export default function InvalidUnicode() {
  return (
    <VStack>
      <Heading>Invalid Unicode</Heading>
      <Divider />
      <Text>指定されたUnicodeは使用できません。</Text>
      <Text>以下の場合、当サービスではサポートしていません</Text>
      <UnorderedList>
        <ListItem>存在しないUnicode</ListItem>
        <ListItem>制御文字もしくは空白文字</ListItem>
      </UnorderedList>
    </VStack>
  );
}

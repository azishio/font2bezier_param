"use client";

import {
  Divider,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

export default function InvalidFontFamily() {
  return (
    <VStack>
      <Heading>Invalid Font Family</Heading>
      <Divider />
      <Text>指定されたフォントファミリは使用できません。</Text>
      <Text>
        以下のフォントファミリ名を指定された場合、当サービスでは使用できません
      </Text>
      <UnorderedList>
        <ListItem>存在しないフォントファミリ</ListItem>
        <ListItem>PCにインストールされていないフォントファミリ</ListItem>
      </UnorderedList>
    </VStack>
  );
}

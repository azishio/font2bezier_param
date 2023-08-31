"use client";

import {
  Divider,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

export default function InvalidEnvironment() {
  return (
    <VStack>
      <Heading>Invalid Environment</Heading>
      <Divider />
      <Text>ご使用の環境に対応していません</Text>
      <Text>
        当サービスを利用するには、以下のいずれかの環境で、ローカルフォントへのアクセスを許可する必要があります。
      </Text>
      <UnorderedList>
        <ListItem>Chrome：2022/06/21以降リリースのデスクトップ版</ListItem>
        <ListItem>Edge：2022/06/21以降リリースのデスクトップ版</ListItem>
      </UnorderedList>
    </VStack>
  );
}

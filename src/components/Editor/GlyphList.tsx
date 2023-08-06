import {
  Button,
  Select,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { unicodeBlocks } from "./unicode/unicodeBlocks";
import { isNotCtrlChar } from "./unicode/check";

export default function GlyphList() {
  const [blockIndex, setBlockIndex] = useState(0);
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBlockIndex(Number.parseInt(e.target.value, 10));
  };
  return (
    <Stack>
      <Select onChange={onChange}>
        {unicodeBlocks.map((v, i) => (
          <option value={i}>{v.blockName_jp}</option>
        ))}
      </Select>
      <VStack
        divider={<StackDivider borderColor="whitesmoke" />}
        h="90vh"
        spacing={0}
        overflowY="scroll"
      >
        {Array.from(
          {
            length:
              unicodeBlocks[blockIndex].blockEnd -
              unicodeBlocks[blockIndex].blockStart,
          },
          (_, i) => i + unicodeBlocks[blockIndex].blockStart,
        )
          .filter((v) => isNotCtrlChar(v))
          .map((v) => (
            <Button w="100%" variant="ghost">
              <Text>{String.fromCharCode(v)}</Text>
            </Button>
          ))}
      </VStack>
    </Stack>
  );
}

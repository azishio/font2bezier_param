import {
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { BsBezier2 } from "react-icons/bs";
import { TbVectorBezierCircle } from "react-icons/tb";
import { MdOutlinePolyline } from "react-icons/md";
import { FiDelete, FiMove } from "react-icons/fi";

export default function Tools() {
  return (
    <HStack>
      <Box border="solid 1px gray" w="fit-content" borderRadius={5} padding={1}>
        <ButtonGroup>
          <Tooltip label="PolyBezier">
            <IconButton aria-label="PolyBezierの作成" icon={<BsBezier2 />} />
          </Tooltip>
          <Tooltip label="ClosedPolyBezier">
            <IconButton
              aria-label="ClosedPolyBezierの作成"
              icon={<TbVectorBezierCircle />}
            />
          </Tooltip>
          <Tooltip label="PolyLine">
            <IconButton
              aria-label="PolyLineの作成"
              icon={<MdOutlinePolyline />}
            />
          </Tooltip>
        </ButtonGroup>
      </Box>
      <Box border="solid 1px gray" w="fit-content" borderRadius={5} padding={1}>
        <ButtonGroup>
          <Tooltip label="Move">
            <IconButton aria-label="Move" icon={<FiMove />} />
          </Tooltip>
          <Tooltip label="Delete">
            <IconButton aria-label="Delete" icon={<FiDelete />} />
          </Tooltip>
        </ButtonGroup>
      </Box>
    </HStack>
  );
}

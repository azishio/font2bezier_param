import {
  HStack,
  Kbd,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  PiMouseDuotone,
  PiSelectionBackgroundDuotone,
  PiSelectionDuotone,
  PiSelectionPlusDuotone,
} from "react-icons/pi";
import { MdOutlinePolyline, MdPolyline } from "react-icons/md";
import { BsBezier2 } from "react-icons/bs";
import { TbVectorBezierCircle } from "react-icons/tb";
import { FiDelete, FiMove } from "react-icons/fi";

export default function KbdGuid() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Th>項目</Th>
          <Th>操作</Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <HStack>
                <PiSelectionDuotone />
                <Text>選択</Text>
              </HStack>
            </Td>
            <Td>
              <HStack>
                <PiMouseDuotone />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <PiSelectionPlusDuotone />
                <Text>追加選択</Text>
              </HStack>
            </Td>
            <Td>
              <HStack>
                <Kbd>Shift</Kbd>
                <Text>+</Text>
                <PiMouseDuotone />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <PiSelectionBackgroundDuotone />
                <Text>追加選択</Text>
              </HStack>
            </Td>
            <Td>
              <HStack>
                <Kbd>Ctrl</Kbd>
                <Text>+</Text>
                <PiMouseDuotone />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <MdPolyline />
                <Text>連続点選択</Text>
              </HStack>
            </Td>
            <Td>
              <HStack>
                <Kbd>Alt</Kbd>
                <Text>+</Text>
                <PiMouseDuotone />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <BsBezier2 />
                <Text>PolyBezierの作成</Text>
              </HStack>
            </Td>
            <Td>
              <Kbd>B</Kbd>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <TbVectorBezierCircle />
                <Text>ClosedPolyBezierの作成</Text>
              </HStack>
            </Td>
            <Td>
              <Kbd>C</Kbd>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <MdOutlinePolyline />
                <Text>PolyLineの作成</Text>
              </HStack>
            </Td>
            <Td>
              <Kbd>L</Kbd>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <FiMove />
                <Text>移動</Text>
              </HStack>
            </Td>
            <Td>
              <Kbd>M</Kbd>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <FiDelete />
                <Text>削除</Text>
              </HStack>
            </Td>
            <Td>
              <Kbd>Delete</Kbd>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

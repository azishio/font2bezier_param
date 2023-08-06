import { MouseEvent, useRef, useState } from "react";
import EditorState from "Editor/EditorState";
import Canvas from "components/Editor/Canvas";
import Head from "next/head";
import { AspectRatio, Flex, VStack } from "@chakra-ui/react";
import Tools from "../../../components/Editor/Tools";
import KbdGuid from "../../../components/Editor/KbdGuid";
import GlyphList from "../../../components/Editor/GlyphList";

export default function EditorPage() {
  const familyName = "hoge"; // useFontFamilyValidator();
  const unicode = 50; // useUnicodeValidator();

  const [glyph, setGlyph] = useState("");

  const [editorState] = useState(
    new EditorState({ polyBezier: [], polyLine: [] }),
  );

  const [ctx, setCtx] = useState<{
    grid: CanvasRenderingContext2D;
    content: CanvasRenderingContext2D;
    selection: CanvasRenderingContext2D;
    selectRange: CanvasRenderingContext2D;
  } | null>(null);

  const canvasWrapper = useRef<HTMLDivElement>(null);

  const operationState = useRef<
    "select" | "createBezier" | "createClosedBezier" | "createLine" | "move"
  >("select");

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height } = selectRangeLayer.current!;

    // -200~1200
    const x = (clientX / width) * 1400 - 200;
    const y = (clientY / height) * 1400 - 200;

    editorState.setCursor({ x, y });
  };

  const mouseDown = () => {
    if (operationState.current === "select") editorState.setAnchor();
    else editorState.acceptOverWrite();
  };
  const mouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (operationState.current === "select") {
      const { ctrlKey, altKey, shiftKey } = e;

      let option: null | "add" | "sub" | "shape" = null;
      if (shiftKey) option = "add";
      else if (ctrlKey) option = "sub";
      else if (altKey) option = "shape";

      if (operationState.current === "select") editorState.select(option);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex gap={10}>
          <GlyphList />
          <VStack>
            <Tools />
            <AspectRatio ratio={1} minW="100%" ref={canvasWrapper} m={10}>
              <Canvas
                fontFamily={familyName}
                setCtx={setCtx}
                char={String.fromCharCode(unicode)}
              />
            </AspectRatio>
            <KbdGuid />
          </VStack>
        </Flex>
      </main>
    </>
  );
}

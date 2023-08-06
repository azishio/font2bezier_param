import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function Canvas({
  char,
  fontFamily,
  setCtx,
}: {
  char: string;
  fontFamily: string;
  setCtx: Dispatch<
    SetStateAction<{
      grid: CanvasRenderingContext2D;
      content: CanvasRenderingContext2D;
      selection: CanvasRenderingContext2D;
      selectRange: CanvasRenderingContext2D;
    } | null>
  >;
}) {
  const gridLayer = useRef<HTMLCanvasElement>(null);
  // すべての図形を描画
  const contentLayer = useRef<HTMLCanvasElement>(null);
  // 選択された図形を別色で描画
  const selectionLayer = useRef<HTMLCanvasElement>(null);
  // 選択範囲を表す矩形を描画
  const selectRangeLayer = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const gridCtx = gridLayer.current?.getContext("2d", {
      alpha: false,
      desynchronized: true,
    })!;

    // 背景
    gridCtx.fillStyle = "white";
    gridCtx.fillRect(0, 0, 1400, 1400);

    // 文字の表示
    gridCtx.strokeStyle = "gray";
    gridCtx.lineWidth = 2;
    gridCtx.fillStyle = "whitesmoke";
    gridCtx.textAlign = "center";
    gridCtx.textBaseline = "middle";
    gridCtx.font = `100 1000px ${fontFamily}`;
    gridCtx.fillText(char, 700, 700);
    gridCtx.strokeText(char, 700, 700);

    // グリッドの描画
    gridCtx.strokeStyle = "888888";
    gridCtx.lineWidth = 1;

    gridCtx.beginPath();
    for (let n = 0; n <= 1400; n += 50) {
      gridCtx.moveTo(n, 0);
      gridCtx.lineTo(n, 1400);
      gridCtx.stroke();

      gridCtx.beginPath();
      gridCtx.moveTo(0, n);
      gridCtx.lineTo(1400, n);
    }
    gridCtx.stroke();

    gridCtx.beginPath();
    gridCtx.rect(0, 0, 1399, 1399);
    gridCtx.stroke();

    gridCtx.lineWidth = 3;
    gridCtx.strokeStyle = "white";

    gridCtx.beginPath();
    gridCtx.rect(200, 200, 1000, 1000);
    gridCtx.moveTo(700, 0);
    gridCtx.lineTo(700, 1400);
    gridCtx.moveTo(0, 700);
    gridCtx.lineTo(1700, 700);
    gridCtx.stroke();

    gridCtx.strokeStyle = "#333333";
    gridCtx.setLineDash([20, 10]);

    gridCtx.beginPath();
    gridCtx.rect(200, 200, 1000, 1000);
    gridCtx.moveTo(700, 0);
    gridCtx.lineTo(700, 1400);
    gridCtx.moveTo(0, 700);
    gridCtx.lineTo(1700, 700);
    gridCtx.stroke();

    const contentCtx = contentLayer.current?.getContext("2d", {
      alpha: true,
      desynchronized: true,
    })!;
    const selectionCtx = selectionLayer.current?.getContext("2d", {
      alpha: true,
      desynchronized: true,
    })!;
    const selectRangeCtx = selectRangeLayer.current?.getContext("2d", {
      alpha: true,
      desynchronized: true,
    })!;

    // 中心座標移動
    contentCtx.translate(200, 200);
    selectionCtx.translate(200, 200);
    selectRangeCtx.translate(200, 200);

    setCtx({
      grid: gridCtx,
      content: contentCtx,
      selection: selectionCtx,
      selectRange: selectRangeCtx,
    });
  }, [char, setCtx]);

  return (
    <Box
      pos="relative"
      w="100%"
      h="100%"
      sx={{
        canvas: {
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        },
      }}
    >
      <canvas ref={gridLayer} width={1400} height={1400} />
      <canvas ref={contentLayer} width={1400} height={1400} />
      <canvas ref={selectionLayer} width={1400} height={1400} />
      <canvas ref={selectRangeLayer} width={1400} height={1400} />
    </Box>
  );
}

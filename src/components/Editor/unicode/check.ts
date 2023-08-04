import {
  blockNameEn,
  unicodeBlocks,
} from "components/Editor/unicode/unicodeBlocks";

export const isValidBlock = (block: string) =>
  (blockNameEn as string[]).includes(block);

export const isNotCtrlChar = (code: number) => {
  const glyph = String.fromCharCode(code);

  return !/[\p{C}\s]/u.test(glyph);
};

export const isValidUnicode = (code: string) => {
  const num = parseInt(code, 16);
  const glyph = String.fromCharCode(num);
  // 制御文字、空白文字等でないかつ、サポートするブロックの範囲内
  return (
    !/[\p{C}\s]/u.test(glyph) &&
    unicodeBlocks.some(
      (v: { blockStart: number; blockEnd: number }) =>
        v.blockStart <= num && num <= v.blockEnd,
    )
  );
};

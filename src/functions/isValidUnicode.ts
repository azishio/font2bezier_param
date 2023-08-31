import { unicodeBlocks } from "../data/unicodeBlocks";

/**
 *
 * @param unicode queryパラメータ内のunicode
 * @return 問題がなければtrue、問題があればfalse
 */
export default function isValidUnicode(unicode: unknown) {
  if (typeof unicode !== "string") return false;
  if (!/^\d+$/.test(unicode)) return false;

  const num = parseInt(unicode, 16);

  // 整数でなければ不正
  if (!Number.isFinite(num)) return false;

  const glyph = String.fromCharCode(num);

  // 変換後のグリフが1文字でなければ不正
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  if ([...segmenter.segment(glyph)].length !== 1) return false;

  // 制御文字、空白文字等でないかつ、サポートするブロックの範囲内
  return (
    !/^[\p{C}\s]$/u.test(glyph) &&
    unicodeBlocks.some(
      (v: { blockStart: number; blockEnd: number }) =>
        v.blockStart <= num && num <= v.blockEnd,
    )
  );
}

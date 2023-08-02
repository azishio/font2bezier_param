type Vector2D = { x: number; y: number };
export default class VectorUtils {
  // v1+v2
  static add({ x: x1, y: y1 }: Vector2D, { x: x2, y: y2 }: Vector2D) {
    return { x: x1 + x2, y: y1 + y2 };
  }

  // v1-v2
  static sub({ x: x1, y: y1 }: Vector2D, { x: x2, y: y2 }: Vector2D) {
    return { x: x1 - x2, y: y1 - y2 };
  }

  static multi({ x, y }: Vector2D, n: number) {
    return { x: x * n, y: y * n };
  }

  static lerp(v1: Vector2D, v2: Vector2D, amt: number) {
    const { sub, multi, add } = VectorUtils;
    const delta = sub(v2, v1);

    return add(v1, multi(delta, amt));
  }

  static dist({ x: x1, y: y1 }: Vector2D, { x: x2, y: y2 }: Vector2D) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  static clamp({ x, y }: Vector2D) {
    const { max, min } = Math;
    // 座標が取れる値は範囲は-200~1200
    return { x: max(-200, min(x, 1200)), y: max(-200, min(y, 1200)) };
  }
}

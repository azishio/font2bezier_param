/*
ba:始点
ea:終点
ma:中間点
bc:前の点の制御点
ec:後の点の制御点

ba bc ec ma
0  1  2  3
ma bc ec ma
3  4  5  6
ma bc ec ea  // closed === false
6  7  8  9
ma bc ec ea  // closed === true
6  7  8  0
 */
import KeyManager from "@/Editor/Manager/KeyManager";

export default class PolyBezier {
  readonly type = "polyBezier";

  readonly closed;

  readonly key;

  private points;

  constructor(pointKeys: string[], key?: string) {
    this.points = pointKeys;
    this.closed = pointKeys.length % 3 === 2;
    this.key = key || KeyManager.genKey();
  }

  clone() {
    return new PolyBezier(this.points, this.key);
  }

  push(bc: string, ec: string, ea: string) {
    this.points.push(bc, ec, ea);
  }

  unshift(ba: string, bc: string, ec: string) {
    this.points.unshift(ba, bc, ec);
  }

  delete(pointKey: string) {
    const index = this.points.indexOf(pointKey);
    // cpも一緒に削除
    if (index % 3 === 0) this.points.splice(index - 1, 3);
  }

  getPointType(pointKey: string) {
    const index = this.points.indexOf(pointKey);
    if (index === 0) return "ba";
    if (index === this.points.length - 1) return "ea";
    if (index % 3 === 0) return "ma";
    return "cp";
  }
}

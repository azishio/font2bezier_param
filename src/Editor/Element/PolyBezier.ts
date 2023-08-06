// データの形式についてはMEMO参照
export default class PolyBezier {
  readonly type = "polyBezier";

  readonly closed;

  readonly key;

  private readonly points;

  constructor(pointKeys: string[], key: string) {
    this.points = pointKeys;
    this.closed = pointKeys.length % 3 === 0;
    this.key = key;
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

  get() {
    return this.points as ReadonlyArray<string>;
  }
}

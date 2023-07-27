import KeyManager from "@/Editor/Manager/KeyManager";

export default class PolyLine {
  readonly type = "polyLine";

  readonly key;

  private readonly points;

  constructor(pointKeys: string[], key?: string) {
    this.points = pointKeys;
    this.key = key || KeyManager.genKey();
  }

  clone() {
    return new PolyLine(this.points, this.key);
  }

  push(pointKey: string) {
    this.points.push(pointKey);
  }

  unshift(pointKey: string) {
    this.points.unshift(pointKey);
  }

  delete(pointKey: string) {
    const index = this.points.indexOf(pointKey);
    if (index === -1) return;

    this.points.splice(index, 1);
  }

  get() {
    return this.points as ReadonlyArray<string>;
  }
}

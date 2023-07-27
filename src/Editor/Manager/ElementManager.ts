import PolyBezier from "@/Editor/Element/PolyBezier";
import PolyLine from "@/Editor/Element/PolyLine";
import KeyManager from "@/Editor/Manager/KeyManager";
import Point from "@/Editor/Element/Point";

/**
 * Shapeを管理する。
 * 確定していない操作が存在する際のレンダリングのため、overwrite機構を有する。
 * あるkeyがoverwriteとshapesの双方に登録されていた場合、overwriteのものを優先して返す
 */
export default class ElementManager<T extends PolyBezier | PolyLine | Point> {
  private overwrite = new Map<string, T>();

  private overwriteKey = new Set<string>();

  private shapes;

  constructor(shapes: T[]) {
    this.shapes = new Map(shapes.map((v) => [v.key, v]));
  }

  get(key: string) {
    return this.overwrite.get(key) || this.shapes.get(key);
  }

  getAll() {
    const overwritten: T[] = [];

    this.shapes.forEach((v, k) => {
      overwritten.push(this.overwrite.get(k) || v);
    });

    return overwritten;
  }

  clearOverWrite() {
    this.overwrite.clear();
    this.overwriteKey.forEach((k) => {
      KeyManager.unregister(k);
    });
  }

  acceptOverWrite() {
    this.overwrite.forEach((v) => {
      this.shapes.set(v.key, v);
    });

    this.overwrite.clear();
    this.overwriteKey.clear();
  }

  set(shape: T, isNewShape = false) {
    this.overwrite.set(shape.key, shape);
    if (isNewShape) this.overwriteKey.add(shape.key);
  }
}

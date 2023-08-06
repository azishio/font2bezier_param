import Point from "Editor/Element/Point";
import KeyManager from "Editor/Manager/KeyManager";
import PolyBezier from "Editor/Element/PolyBezier";
import ElementManager from "Editor/Manager/ElementManager";
import PolyLine from "Editor/Element/PolyLine";
import VectorUtils from "Editor/VectorUtils";

type Vector2D = { x: number; y: number };
type ShapeData = {
  polyBezier: Vector2D[][];
  polyLine: Vector2D[][];
};

/*
エディタの状態を管理する
ここで扱う座標値はすべて整数に変換される。
これは、キャンバスでの描画時に浮動小数点数の座標があるとサブピクセルレンダリングが発生するため
 */
export default class EditorState {
  shapeManager = new ElementManager<PolyBezier | PolyLine>();

  private pointManager = new ElementManager<Point>();

  private selection = new Set<Point>();

  // 更新されるのはマウスがpressされたとき or 図形の作成がトリガーされたとき
  private anchor: Vector2D = { x: 0, y: 0 };

  // 更新されるのはカーソルが移動したときだけ
  private cursor: Vector2D = { x: 0, y: 0 };

  constructor(shape: ShapeData) {
    KeyManager.clear();

    const { polyBezier, polyLine } = shape;

    polyBezier.forEach((v) => {
      const shapeKey = KeyManager.genKey();
      const pointKeys = v.map(({ x, y }) => {
        const point = new Point(x, y, KeyManager.genKey(), shapeKey);

        this.pointManager.set(point);

        return point.key;
      });

      this.shapeManager.set(new PolyBezier(pointKeys, shapeKey));
    });
    polyLine.forEach((v) => {
      const shapeKey = KeyManager.genKey();
      const pointKeys = v.map(({ x, y }) => {
        const point = new Point(x, y, KeyManager.genKey(), shapeKey);

        this.pointManager.set(point);

        return point.key;
      });

      this.shapeManager.set(new PolyLine(pointKeys, shapeKey));
    });
  }

  export(): ShapeData {
    const polyBezier: Vector2D[][] = [];
    const polyLine: Vector2D[][] = [];

    // keyに対応するvecを探して配列にする
    this.shapeManager.getAll().forEach((v) => {
      const points = v
        .get()
        .map((k) => {
          const p = this.pointManager.get(k);
          return p ? { x: p.x, y: p.y } : undefined;
        })
        .filter((x) => !!x) as Vector2D[];

      if (v.type === "polyBezier") {
        polyBezier.push(points);
      } else {
        polyLine.push(points);
      }
    });

    return { polyBezier, polyLine };
  }

  acceptOverWrite() {
    this.pointManager.acceptOverWrite();
    this.shapeManager.acceptOverWrite();
  }

  clearOverWrite() {
    this.pointManager.clearOverWrite();
    this.shapeManager.clearOverWrite();
  }

  select(option: "add" | "sub" | "shape" | null) {
    const { max, min } = Math;

    // 選択範囲
    const top = min(this.anchor.y, this.cursor.y);
    const bottom = max(this.anchor.y, this.cursor.y);
    const left = min(this.anchor.x, this.cursor.x);
    const right = max(this.anchor.x, this.cursor.x);

    const pointInRange = this.pointManager
      .getAll()
      .filter(
        (v) => left <= v.x && v.x <= right && top <= v.y && v.y <= bottom,
      );

    if (option === "sub") {
      pointInRange.forEach((v) => {
        this.selection.delete(v);
      });
    }
    if (option === "add") {
      pointInRange.forEach((v) => {
        this.selection.add(v);
      });
    }
    // 範囲内のポイントが所属している図形を構成するポイントを全て選択
    if (option === "shape") {
      const allPoint = this.pointManager.getAll();

      const newSelection = new Set<Point>();
      pointInRange.forEach((v) => {
        allPoint
          .filter((point) => point.shapeKey === v.shapeKey)
          .forEach((point) => newSelection.add(point));
      });

      this.selection = newSelection;
    }
    if (!option) {
      this.selection = new Set(pointInRange);
    }
  }

  setAnchor() {
    this.anchor = this.cursor;
  }

  // 呼び出し側は座標値を-200~1200の整数に正規化する責任を持つ
  setCursor(cursor: Vector2D) {
    this.cursor = cursor;
  }

  move() {
    const { sub, clamp } = VectorUtils;

    const { x: dx, y: dy } = sub(this.cursor, this.anchor);

    this.selection.forEach((v) => {
      const { x, y } = v;
      this.pointManager.setOverwrite(
        { ...v, ...clamp({ x: x + dx, y: y + dy }) },
        false,
      );
    });
  }

  /*
  新しい図形をoverwriteに登録させる
  更新時、すでにoverwriteに登録されているkeyとは別のkeyを生成し、元のkeyに関連づけられたインスタンスは破棄される
   */
  create(type: "bezier" | "line" | "closedBezier") {
    this.shapeManager.clearOverWrite();
    this.pointManager.clearOverWrite();

    const ba = this.anchor;
    const ea = this.cursor;

    const shapeKey = KeyManager.genKey();

    if (type === "line") {
      const baKey = KeyManager.genKey();
      const eaKey = KeyManager.genKey();

      this.pointManager.setOverwrite(
        new Point(ba.x, ba.y, baKey, shapeKey),
        true,
      );
      this.pointManager.setOverwrite(
        new Point(ea.x, ea.y, eaKey, shapeKey),
        true,
      );

      this.shapeManager.setOverwrite(
        new PolyLine([baKey, eaKey], shapeKey),
        true,
      );
    }
    if (type === "bezier") {
      const { lerp } = VectorUtils;

      const baKey = KeyManager.genKey();
      const eaKey = KeyManager.genKey();
      const bcKey = KeyManager.genKey();
      const ecKey = KeyManager.genKey();

      const bc = lerp(ba, ea, 0.3);
      const ec = lerp(ea, ba, 0.3);

      this.pointManager.setOverwrite(
        new Point(ba.x, ba.y, baKey, shapeKey),
        true,
      );
      this.pointManager.setOverwrite(
        new Point(bc.x, bc.y, bcKey, shapeKey),
        true,
      );
      this.pointManager.setOverwrite(
        new Point(ea.x, ea.y, eaKey, shapeKey),
        true,
      );
      this.pointManager.setOverwrite(
        new Point(ec.x, ec.y, ecKey, shapeKey),
        true,
      );

      this.shapeManager.setOverwrite(
        new PolyBezier([baKey, bcKey, ecKey, eaKey], shapeKey),
        true,
      );
    }
    if (type === "closedBezier") {
      // 円を作成
      const { x, y } = this.anchor;
      const r = VectorUtils.dist(this.anchor, this.cursor);

      // https://tutorialmore.com/questions-1492164.htm
      const d = 0.552284749831 * r;

      const a1 = { x, y: y + r };
      const bc1 = { x: x + d, y: y + r };
      const ec1 = { x: x + r, y: y + d };
      const a2 = { x: x + r, y };
      const bc2 = { x: x + r, y: y - d };
      const ec2 = { x: x + d, y: y - r };
      const a3 = { x, y: y - r };
      const bc3 = { x: x - d, y: y - r };
      const ec3 = { x: x - r, y: y - d };
      const a4 = { x: x - r, y };
      const bc4 = { x: x - r, y: y + d };
      const ec4 = { x: x - d, y: y + r };

      const pointKeys = Array.from({ length: 12 }, () => KeyManager.genKey());
      [a1, bc1, ec1, a2, bc2, ec2, a3, bc3, ec3, a4, bc4, ec4].forEach(
        (p, i) => {
          this.pointManager.setOverwrite(
            new Point(p.x, p.y, pointKeys[i], shapeKey),
            true,
          );
        },
      );

      this.shapeManager.setOverwrite(new PolyBezier(pointKeys, shapeKey), true);
    }
  }

  // 選択された図形をレンダリングする
  renderSelection(ctx: CanvasRenderingContext2D) {}

  // 選択範囲を表す矩形をレンダリングする
  renderSelectRange(ctx: CanvasRenderingContext2D) {}

  // すべての図形をレンダリングする
  renderContent(ctx: CanvasRenderingContext2D) {
    // 全図形→選択された図形と重ねて描画する
    // 全図形の描画
    this.shapeManager.getAll().forEach((v) => {
      const [firstPoint, ...points] = v
        .get()
        .map((key) => this.pointManager.get(key) || { x: -1, y: -1 });

      ctx.beginPath();
      ctx.moveTo(firstPoint.x, firstPoint.y);

      if (v.type === "polyBezier") {
        // 閉じる用のea
        if (v.closed) points.push(firstPoint);

        for (let i = 0; i < points.length; i += 3) {
          const { x: cp1x, y: cp1y } = points[i];
          const { x: cp2x, y: cp2y } = points[i + 1];
          const { x, y } = points[i + 2];

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }
      } else {
        // polyLine
        points.forEach((p) => {
          ctx.lineTo(p.x, p.y);
        });
      }

      ctx.stroke();
    });
  }
}

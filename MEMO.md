# 図形の表現について

DBに保存する際はDB保存時は座標の配列、使用時は点と図形を分けて管理する

```typescript
type Vector2D = {x:number; y:number}

// DB保存時
Vector2D[]

// 展開時
point: {
    x: number
    y: number
    key: string
    shapeKey: string
}


shape: {
    type: string
    key: string
    points :string[] // pointのkey
}
```

## PolyBezier

各点を以下の規則に従って並べる

`[ba, bc, ec, ma, ..., ma, bc, ec, ea]`

このとき、以下のように参照できる

```
ba:始点(beginning anchor)
ea:終点(ending anchor)
ma:中間点(middle anchor)
bc:前の点の制御点(beginning control)
ec:後の点の制御点(ending control)

ba bc ec ma
0  1  2  3
ma bc ec ma
3  4  5  6
ma bc ec ea  
6  7  8  9
```

曲線が閉じている場合、最後の`ea`は先頭を参照する

```
ba bc ec ma
0  1  2  3
ma bc ec ma
3  4  5  6
ma bc ec ea  
6  7  8  0
```

よって、DBに保存された曲線が閉じているか否かは要素の数で判定する。

曲線が閉じている場合、要素数は`3n`、開いている場合は`3n+1`になる。

参照する際は

anchor：`3n`

bc：`3n+1`

ec：`3n+2`or`3n-1`

## polyLine

座標の配列がそのままAnchorになる


# UIライブラリについて
`app/`ディレクトリ構造を採用したため、`Chakra-UI`から`NextUI`に乗り換え。
`NextUI`では、各コンポーネントの中で`"use cilent";`が記述されているため、サーバーコンポーネントでも使える。
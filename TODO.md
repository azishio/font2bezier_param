+[ ] エディタの作成
  + [x] エディタの状態管理クラス
  + [x] エディタの描画ページ
  + [ ] 描画ページと状態管理クラスの関連付け
  + [ ] 有効なfamilyの取得用hook
    + [ ] ブラウザの判定
    + [ ] Font Access API で一覧を取得
    + [ ] _appからuseContextで配信
  + [x] unicodeの判定hook
  + [ ] fontFamilyの判定hook
+[ ] DB
  + mongoDBを使用
  + ドキュメント
    ```typescript
    {
        ObjectId: ObjectId
        fontFamily: string
        unicode: number
        polyBezier: number[][]
        polyLine: number[][]
    }
    ```
  + mongooseは使わずに公式のドライバをつかうこと
  + [ ] 認証まわり
+[ ] API
  + 仕様：https://font2bezier-param.apidog.io
  + メモ：一般公開はしないので、クライアントが持っているfontのチェックはしない
  + 検討事項
    + グリフのデータ取得メゾット
+[ ] ダウンロードページ
  + クライアントが持っているfontFamilyに対応するのデータをdbから取得し、一覧表示する
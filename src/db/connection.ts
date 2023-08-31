import { createConnection } from "mysql2/promise";
import { Data } from "../@types/Data";

export default class Connection {
  private connection;

  constructor() {
    this.connection = createConnection({
      host: "db",
      user: "root",
      password: "root",
      database: "app",
    });
  }

  // グリフの登録
  register(
    familyName: string,
    block: string,
    unicode: number,
    user: string,
    data: Data,
  ) {
    this.connection.then((conn) =>
      conn.query(
        `
      INSERT INTO glyph (family_name, block, unicode, user, data)
      VALUES (?, ?, ? ,? ,?);
    `,
        [familyName, block, unicode, user, data],
      ),
    );
  }

  update(id: number, data: Data) {
    this.connection.then((conn) =>
      conn.query(
        `
    UPDATE glyph
    SET data = ?
    WHERE _id = ?;
    `,
        [JSON.stringify(data), id],
      ),
    );
  }

  // familyから検索
  async findByFamily(familyName: string) {
    return this.connection.then((conn) =>
      conn.query(
        `
        SELECT *
        FROM glyph
        WHERE family_name = ?
        ORDER BY unicode ASC;
        `,
        [familyName],
      ),
    );
  }

  async findByFamilyAndUnicode(familyName: string, unicode: number) {
    return this.connection.then((conn) =>
      conn.query(
        `
      SELECT *
      FROM glyph
      WHERE family_name = ?
      AND   unicode = ?;
      `,
        [familyName, unicode],
      ),
    );
  }

  async findByFamilyAndUnicodes(familyName: string, unicodes: number[]) {
    return this.connection.then((conn) =>
      conn.query(
        `
      SELECT *
      FROM glyph
      WHERE family_name = ?
      AND   unicode IN (?);
      `,
        [familyName, unicodes],
      ),
    );
  }

  async findOne(familyName: string, unicode: number, user: string) {
    return this.connection.then((conn) =>
      conn.query(
        `
      SELECT *
      FROM glyph
      WHERE family_name = ?
      AND   unicode = ?
      AND   user = ?
      LIMIT 1;
      `,
        [familyName, unicode, user],
      ),
    );
  }

  // 登録されているfamily一覧
  async registeredFamilies() {
    return this.connection.then((conn) =>
      conn.query(`
    SELECT DISTINCT family_name
    FROM glyph;
    `),
    );
  }
}

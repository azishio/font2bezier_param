export default class KeyManager {
  private static usedKeys = new Set<string>();

  static genKey() {
    const { usedKeys } = KeyManager;

    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsetLength = charset.length;
    const randomStr = () => {
      let str = "";
      for (let i = 0; i <= 3; i++) {
        const index = Math.floor(Math.random() * charsetLength);
        str += charset.charAt(index);
      }
      return str;
    };

    let key = randomStr();
    while (usedKeys.has(key)) {
      key = randomStr();
    }

    usedKeys.add(key);
    return key;
  }

  static unregister(key: string) {
    KeyManager.usedKeys.delete(key);
  }

  static clear() {
    KeyManager.usedKeys.clear();
  }
}

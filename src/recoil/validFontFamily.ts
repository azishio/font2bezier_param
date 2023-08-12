import { atom } from "recoil";

export const validFontFamily = atom<null | string[]>({
  key: "validFontFamily",
  default: null,
});

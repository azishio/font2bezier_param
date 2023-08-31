import { atom } from "recoil";

const validFontFamilies = atom<string[]>({
  key: "validFontFamilies",
  default: [],
});

export default validFontFamilies;

import type { Meta } from "@storybook/react";
import InvalidFontFamily from "../app/(useClient)/(errorPage)/InvalidFontFamily/page";

const meta: Meta<typeof InvalidFontFamily> = {
  title: "Error/FontFamily",
  component: InvalidFontFamily,
};

export default meta;

export function A() {
  return <InvalidFontFamily />;
}

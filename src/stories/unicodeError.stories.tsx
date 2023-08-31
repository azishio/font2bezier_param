import type { Meta } from "@storybook/react";
import InvalidUnicode from "../app/(useClient)/(errorPage)/InvalidUnicode/page";

const meta: Meta<typeof InvalidUnicode> = {
  title: "Error/Unicode",
  component: InvalidUnicode,
};

export default meta;

export function A() {
  return <InvalidUnicode />;
}

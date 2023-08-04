import type { Meta } from "@storybook/react";
import Tools from "components/Editor/Tools";

const meta: Meta<typeof Tools> = {
  title: "Editor/Tools",
  component: Tools,
};

export default meta;

export function A() {
  return <Tools />;
}

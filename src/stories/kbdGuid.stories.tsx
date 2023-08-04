import type { Meta } from "@storybook/react";
import KbdGuid from "../components/Editor/KbdGuid";

const meta: Meta<typeof KbdGuid> = {
  title: "Editor/KeyboardGuid",
  component: KbdGuid,
};

export default meta;

export function A() {
  return <KbdGuid />;
}

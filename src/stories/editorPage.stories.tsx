import type { Meta } from "@storybook/react";
import EditorPage from "../pages/edit/[familyName]/[glyph]";

const meta: Meta<typeof EditorPage> = {
  title: "Editor/Page",
  component: EditorPage,
};

export default meta;

export function A() {
  return <EditorPage />;
}

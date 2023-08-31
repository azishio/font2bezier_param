import type { Meta } from "@storybook/react";
import EditorPage from "../app/(useClient)/[familyName]/edit/[unicode]/page";

const meta: Meta<typeof EditorPage> = {
  title: "Editor/editorPage",
  component: EditorPage,
};

export default meta;

export function A() {
  return <EditorPage />;
}

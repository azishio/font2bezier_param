import type { Meta } from "@storybook/react";
import Editor from "../app/(useClient)/[familyName]/edit/[unicode]/_components/Editor";

const meta: Meta<typeof Editor> = {
  title: "Editor/editor",
  component: Editor,
};

export default meta;

export function A() {
  return <Editor />;
}

import type { Meta } from "@storybook/react";
import EditorPage from "../pages/edit/[familyName]/[glyph]";
import GlyphList from "../components/Editor/GlyphList";

const meta: Meta<typeof EditorPage> = {
  title: "Editor/GlyphList",
  component: GlyphList,
};

export default meta;

export function A() {
  return <GlyphList />;
}

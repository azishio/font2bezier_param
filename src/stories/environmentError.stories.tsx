import type { Meta } from "@storybook/react";
import InvalidEnvironment from "../app/(useClient)/(errorPage)/InvalidEnvironment/page";

const meta: Meta<typeof InvalidEnvironment> = {
  title: "Error/Environment",
  component: InvalidEnvironment,
};

export default meta;

export function A() {
  return <InvalidEnvironment />;
}

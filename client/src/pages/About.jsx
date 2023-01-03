import { useTheme } from "@emotion/react";
import { Page } from "../common/layout";
export default function About() {
  const theme = useTheme();
  return <Page theme={theme}>About</Page>;
}

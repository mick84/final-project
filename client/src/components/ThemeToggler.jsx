import styled from "@emotion/styled";
import { useState } from "react";
import { palette } from "../common/palette";
export const themes = {
  day: {
    color: palette.fogra,
    backgroundColor: palette.antiqueWhite,
  },
  night: {
    color: palette.antiqueWhite,
    backgroundColor: palette.fogra,
  },
};
const Box = styled.div`
  @media screen and (orientation: portrait) {
    order: -1;
  }
  height: 1.5rem;
  aspect-ratio: 2;
  border-radius: 1.5rem;
  border: 1px solid ${palette.antiqueWhite};
  #switch {
    border-radius: 1.5rem;
    transform: translateX(
      ${(props) => (props.theme === themes.day ? 0 : "107%")}
    );
    transition: all 0.1s linear;
    height: 100%;
    aspect-ratio: 1;
    background-color: ${palette.antiqueWhite};
  }
`;
export const useMyTheme = () => useState(themes.day);
export const ThemeToggler = (props) => {
  return (
    <Box {...props}>
      <div id="switch" />
    </Box>
  );
};

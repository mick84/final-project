import styled from "@emotion/styled";
//import { keyframes } from "@emotion/react";

//import { palette } from "../common/palette";
/*
const turn = keyframes`
    100%{
            transform:rotate(1turn)
        }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: ${turn} 2s linear infinite forwards;
  height: 10rem;
  aspect-ratio: 1;
  width: fit-content;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  overflow: hidden;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-radius: 50%;
  & > #inner {
    border-left: none;
    border-bottom: none;
    border-right: none;
    height: 9rem;
    border-radius: 50%;
    margin-top: auto;
    aspect-ratio: 1;
    box-shadow: 0 0 1rem 1rem ${palette.pink};
    opacity: 0.5;
    transform: translateX(-1rem) scale(1.2);
  }
`;
*/
export const Loader = () => (
  <>
    <Sp>
      <div className="dot" /> <div className="dot" />
      <div className="dot" /> <div className="dot" />
    </Sp>
  </>

  /*<Box>
    <div id="inner" />
  </Box>*/
);
const Sp = styled.div`
  padding: 1rem;
  margin: 1rem;
  display: flex;
  gap: 1rem;
  .dot {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: aqua;
  }
`;

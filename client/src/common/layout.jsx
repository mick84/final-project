import styled from "@emotion/styled";
import { palette } from "./palette";
export const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0.25rem 0.25rem 0.25rem 0.1rem gray;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => props.color};
  color: ${(props) => props.color};
  &[disabled] {
    filter: grayscale(1);
  }
  &[type="submit"] {
    border: 2px solid green;
    color: green;
  }
  &[type="reset"] {
    border: 2px solid red;
    color: red;
  }
`;
export const FlexHorContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;
export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  //border: 1px solid white;
  border-radius: 0.5rem;
  & * {
    color: white;
  }
  &:hover {
    box-shadow: 0 0 1rem 0.1rem lightblue;
  }
  label {
    font-size: 1.2rem;
  }
  input {
    border: none;
    border-bottom: 2px solid gray;
    font-size: 1.1rem;
    padding: 0.25rem 1rem;
    outline: none;
    width: fit-content;
    &:hover {
      font-size: 1.1rem;
    }
    ::placeholder {
      color: white;
      font-style: italic;
    }
    background-color: transparent;
    //background-color: transparent;
  }
`;
export const FormLayout = styled.form`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: white;
  background-image: linear-gradient(#303030 50%, #616161 70%);
  border-radius: 0.5rem;
  .title {
    font-size: 1.5rem;
  }
`;
export const FormButtons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;
export const Filler = styled.div`
  height: 100%;
`;
export const Navbar = styled.nav`
  user-select: none;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Hind";
  letter-spacing: 0.1rem;
  gap: 0.5rem;
  background-color: ${palette.greenBrown};
  a {
    color: ${palette.steelTeal};
  }
  .logo {
    font-size: 2rem;
    color: ${palette.prussianBlue};
    font-style: italic;
    padding: 0 2rem;
    border-right: 2px solid;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    .logo {
      display: none;
      //order: 3;
    }
    .mainMenu {
      flex-direction: column;
      align-items: center;
    }
  }
  & .logo {
    font-weight: bolder;
  }
  .mainMenu {
    display: flex;
    gap: 5vmin;
    font-size: large;
    font-weight: bold;
  }
  .auth {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    color: ${palette.steelTeal};
    cursor: pointer;
  }
`;
export const Page = styled.div`
  display: flex;
  //justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  min-height: 92vh;
  //height: max-content;
  background-attachment: fixed;
  .page-title {
    font-weight: bold;
    font-size: 2rem;
  }
`;

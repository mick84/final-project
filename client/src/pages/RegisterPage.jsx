import { Page } from "../common/layout";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Button, FormLayout, FormControl, FormButtons } from "../common/layout";
import { changeInput } from "../utils";
import { passwordStrength } from "check-password-strength";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { AUTHACTIONS, useAuth } from "../context/AuthContext";

export default function RegisterPage(props) {
  const theme = useTheme();
  const initialInputs = {
    passportID: "",
    email: "",
    nickname: "",
    password: "",
    passwordver: "",
  };
  const goto = useNavigate();
  const [inputs, setInputs] = useState(initialInputs);
  const [state, setState] = useState({
    error: null,
    loading: false,
  });
  const { dispatch } = useAuth();
  const handleInputChange = ({ target }) => {
    changeInput(target, setInputs);
  };
  const clearInputs = () => setInputs(() => initialInputs);
  const handleRegister = async (e) => {
    e.preventDefault();
    setState((st) => ({ ...st, loading: true }));
    const { passportID, email, nickname, password } = inputs;
    try {
      const { data } = await API.post(
        "/user/register",
        {
          passportID,
          email,
          nickname,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({ type: AUTHACTIONS.REGISTER, payload: data });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      goto("/");
    } catch (error) {
      console.error(error);
    } finally {
      setState((st) => ({ ...st, loading: false }));
      clearInputs();
    }
  };
  return (
    <Page theme={theme}>
      <>
        {state.loading && <Loader />}
        <FormLayout
          color={props.color}
          onSubmit={handleRegister}
          onReset={clearInputs}
        >
          <div className="title">Register the new User</div>
          <hr />
          <FormControl>
            <label htmlFor="passportID">Your passport ID</label>
            <input
              type="text"
              id="passportID"
              name="passportID"
              placeholder="valid israeli ID"
              pattern="[0-9]{9}"
              title="9 digits only without any extra symbols"
              maxLength={9}
              required
              value={inputs.passportID}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="nickname">Choose the nickname:</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              pattern="^[a-zA-Z]{1}\w{3,9}$"
              title="4 to 10 alphanumericals, starts with letter"
              placeholder="letter first, 4 to 10 symbols"
              maxLength={10}
              required
              value={inputs.nickname}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="user@domain.ext"
              maxLength={30}
              required
              value={inputs.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="password">Enter password:</label>
            <input
              type="password"
              id="password"
              name="password"
              maxLength={20}
              required
              value={inputs.password}
              onChange={handleInputChange}
              style={{ userSelect: "none" }}
              placeholder="only strong password allowed"
            />
            <p name="passwordCheck">
              {passwordStrength(inputs.password).value}
            </p>
          </FormControl>
          <FormControl>
            <label htmlFor="passwordver">Verify the password:</label>
            <input
              type="password"
              name="passwordver"
              id="passwordver"
              maxLength={20}
              required
              placeholder="can not copy from above"
              value={inputs.passwordver}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormButtons>
            <Button type="reset">Clear</Button>
            <Button
              type="submit"
              disabled={
                inputs.password !== inputs.passwordver ||
                passwordStrength(inputs.password).id < 3
              }
            >
              Submit
            </Button>
          </FormButtons>
        </FormLayout>
      </>
    </Page>
  );
}

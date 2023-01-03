import { Page } from "../common/layout";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import API from "../api";
import { Button, FormLayout, FormControl, FormButtons } from "../common/layout";
import { Loader } from "../components/Loader";
import { useAuth, AUTHACTIONS } from "../context/AuthContext";
import { changeInput } from "../utils";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const theme = useTheme();
  const initialInputs = {
    email: "",
    password: "",
  };
  const goto = useNavigate();
  const { dispatch } = useAuth();
  const [inputs, setInputs] = useState(initialInputs);
  const [state, setState] = useState({ error: null, loading: false });
  const clearInputs = () => setInputs(() => initialInputs);
  const handleInputChange = ({ target }) => {
    changeInput(target, setInputs);
  };
  const handleLogin = async (e) => {
    try {
      setState((st) => ({ ...st, loading: true }));
      e.preventDefault();
      const res = await API.post("/user/login", inputs);
      dispatch({ type: AUTHACTIONS.LOGIN, payload: res.data });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      goto("/");
    } catch (error) {
      setState((st) => ({ ...st, error }));
    } finally {
      setState((st) => ({ ...st, loading: false }));
      clearInputs();
    }
  };
  return (
    <Page theme={theme}>
      {state.loading && <Loader />}
      <FormLayout onSubmit={handleLogin} onReset={clearInputs}>
        <div className="title">User Login</div>
        <hr />
        <FormControl>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength={30}
            value={inputs.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength={20}
            value={inputs.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormButtons>
          <Button type="reset">Clear</Button>
          <Button type="submit">Submit</Button>
        </FormButtons>
      </FormLayout>
    </Page>
  );
};

import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./normalize.css";
import "./App.css";
import { Button, Navbar } from "./common/layout";
import Home from "./pages/Home";
import About from "./pages/About";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import CheckSellerPage from "./pages/CheckSellerPage";
import BoughtCarPage from "./pages/BoughtCarPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ThemeProvider } from "@emotion/react";
import { ThemeToggler, useMyTheme, themes } from "./components/ThemeToggler";
import { AUTHACTIONS, useAuth } from "./context/AuthContext";
import { Protected } from "./common/ProtectedElement";
function App() {
  const [theme, setTheme] = useMyTheme();
  const { state, dispatch } = useAuth();
  return (
    <div className="App">
      <Navbar>
        <div className="logo">CUDE</div>
        <ul className="mainMenu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="feedbacks">Feedbacks</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
          {state.user && (
            <>
              <li>
                <NavLink to="/bought-car">Bought&nbsp;a&nbsp;Car</NavLink>
              </li>
              <li>
                <NavLink to="/check-seller">Check&nbsp;the&nbsp;Seller</NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="auth">
          {state.user ? (
            <>
              <NavLink to="/profile">{state.user.nickname}</NavLink>
              <Button
                color="green"
                onClick={dispatch.bind(null, { type: AUTHACTIONS.LOGOUT })}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>/
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          <ThemeToggler
            theme={theme}
            onClick={setTheme.bind(null, (st) =>
              st === themes.day ? themes.night : themes.day
            )}
          />
        </div>
      </Navbar>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/check-seller"
            element={
              <Protected user={state.user}>
                <CheckSellerPage />
              </Protected>
            }
          />
          <Route
            path="/bought-car"
            element={
              <Protected user={state.user}>
                <BoughtCarPage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected user={state.user}>
                <ProfilePage />
              </Protected>
            }
          />
          <Route
            path="/register"
            element={
              state.user ? <Navigate to="/" replace /> : <RegisterPage />
            }
          />
          <Route
            path="/login"
            element={state.user ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

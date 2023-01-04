import { createContext, useContext, useEffect, useReducer } from "react";

const userCtx = createContext();
export const useAuth = () => useContext(userCtx);
export const AUTHACTIONS = {
  LOGIN: "login",
  REGISTER: "register",
  LOGOUT: "logout",
  SETAVATAR: "change avatar",
};
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTHACTIONS.LOGIN:
      return action.payload;
    case AUTHACTIONS.REGISTER:
      return action.payload;
    case AUTHACTIONS.SETAVATAR:
      return { ...state, avatar: action.payload };
    case AUTHACTIONS.LOGOUT:
      localStorage.clear();
      return {
        user: null,
        token: null,
        avatar: null,
      };
    default:
      console.log("default");
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const tokenStr = localStorage.getItem("token");
    if (userStr && tokenStr) {
      const [user, token] = [userStr, tokenStr].map(JSON.parse);

      dispatch({
        type: AUTHACTIONS.LOGIN,
        payload: { user, token },
      });
    }
  }, []);
  return (
    <userCtx.Provider value={{ state, dispatch }}>{children}</userCtx.Provider>
  );
};

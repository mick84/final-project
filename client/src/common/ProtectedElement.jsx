import { Navigate } from "react-router-dom";
export const Protected = (props) => {
  return props.user ? props.children : <Navigate to={"/"} replace />;
};

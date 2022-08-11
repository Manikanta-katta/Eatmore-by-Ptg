import { Redirect } from "react-router";
import { UserAuth } from "./Authcontext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Redirect to="/loginpage" />;
  }
  return children;
};

export default ProtectedRoute;
import { Outlet } from "react-router-dom";

// Layout component without navbar for authentication routes

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

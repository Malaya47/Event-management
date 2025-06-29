import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Layout component with navbar for authenticated routes
const ProtectedLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;

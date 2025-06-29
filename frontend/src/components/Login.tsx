import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard/events");
    } catch (err: any) {
      alert("Login failed: " + err.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="card-actions justify-end mt-4">
              <p className="text-sm mt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Signup here
                </Link>
              </p>
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await API.post("/signup", form);
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Signup</h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-bordered"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input input-bordered mt-2"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input input-bordered mt-2"
            value={form.password}
            onChange={handleChange}
          />
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

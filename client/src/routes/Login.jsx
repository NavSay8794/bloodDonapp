import React, { useState } from "react";
import { login } from "../utils/axiosutil";
import { useNavigate, useNavigation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    }
    const resp = await login(user)
    if(resp.status==200){
      await localStorage.setItem('bloodDonToken', resp.data.token)
      // Notify app about auth change in same tab
      window.dispatchEvent(new Event('authChanged'));
    }

    navigate('/')
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

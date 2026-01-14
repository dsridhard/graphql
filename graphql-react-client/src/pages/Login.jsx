import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/auth";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login({
      variables: { email, password },
    });

    localStorage.setItem("token", res.data.login.token);
    onLogin(res.data.login.user);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </form>
  );
}
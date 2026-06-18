import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response =
        await loginApi({
          username,
          password
        });

      login(response.token);

      if (response.role) {

        localStorage.setItem(
          "role",
          response.role
        );

}

      navigate("/");
    }
    catch {

      setError(
        "Invalid username or password"
      );
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100"
    >

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        w-96"
      >

        <h1
          className="
          text-2xl
          font-bold
          mb-6"
        >
          EBMS Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          rounded-lg
          mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          rounded-lg
          mb-4"
        />

        {error && (
          <p
            className="
            text-red-500
            mb-4"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;
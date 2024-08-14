import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';

function UserAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home");
    }
  }, [navigate]);

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.REACT_APP_CLIENT_ID
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to {`{Sparks}`}</h1>
        <p className="text-gray-700 mb-8">Sign in to access your account</p>
        <button
          onClick={loginWithGithub}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}

export default UserAuth;

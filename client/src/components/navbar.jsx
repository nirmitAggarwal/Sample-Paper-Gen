import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import 'tailwindcss/tailwind.css';

function NavBar() {
  const [reRender, setReRender] = useState(false);
  const [userData, setUserData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const url = window.location.search;
    const code = new URLSearchParams(url).get("code");
    console.log(code);

    if (code && !localStorage.getItem("accessToken")) {
      async function getAccessToken() {
        await fetch("http://localhost:3000/accessToken?code=" + code, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setReRender(!reRender);
            }
          });
      }
      getAccessToken();
    } else if (localStorage.getItem("accessToken")) {
      getUserData();
    }
  }, [reRender]);

  async function getUserData() {
    await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  }

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">My App</h1>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {localStorage.getItem("accessToken") ? (
                  <>
                    <button
                      onClick={getUserData}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {userData.name ? `Hello, ${userData.name}` : "Get User Data"}
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        setReRender(!reRender);
                      }}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => window.location.assign("http://localhost:5173/")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign in with GitHub
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {localStorage.getItem("accessToken") ? (
            <>
              <button
                onClick={getUserData}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {userData.name ? `Hello, ${userData.name}` : "Get User Data"}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  setReRender(!reRender);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={() => window.location.assign("http://localhost:5173/")}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

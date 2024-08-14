import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';

function UserAuth() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);


  return(

  );
}

import * as React from "react";
import { useEffect } from "react";

function UserAuth() {

  useEffect(()=>{
    const url = window.location.search;
    const code = new URLSearchParams(url).get('code');
    console.log(code);
  }, []);

  function loginWithGithub() {
    window.location.assign('http://github.com/login/oauth/authorize?client_id=' + process.env.REACT_APP_CLIENT_ID );
  }

  return (
    <div>
      <h1>Sign in with Github</h1>
      <button onClick={loginWithGithub()}>Sign in with Github</button>
    </div>
  );
}

export default UserAuth;
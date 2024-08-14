import * as React from "react";
import { useEffect, useState } from "react";

function MainUploader() {

  const [reRender, setReRender] = useState(false);

  useEffect(()=>{
    const url = window.location.search;
    const code = new URLSearchParams(url).get('code');
    console.log(code);

    if(code && (localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === undefined)) {
      
      async function getAccesstoken() {

      await fetch('http://localhost:3000/accessToken?code=' + code, {
          method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.access_token) {
              localStorage.setItem('accessToken', data.access_token);
              setReRender(!reRender);
            }
          });

      }
      getAccesstoken();
  }

  }, []);

  async function getUserData() {
    await fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data)});

  }


  return (
<>
    {
      localStorage.getItem('accessToken') ? (
        <div>
          <h1>Logged in</h1>
          <button onClick={getUserData}>Get User Data</button>
        </div>
      ) : (
        <div>
          <h1>Sign in with Github</h1>
          <button onClick={() => window.location.assign('http://localhost:5173/')}>Sign in with Github</button>
        </div>
        )
    }
</>
  );
}

export default MainUploader;
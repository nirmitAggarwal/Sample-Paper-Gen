import './App.css';

function App() {
  function loginWithGithub() {
    window.location.assign('http://github.com/login/oauth/authorize?client_id=' + process.env.REACT_APP_CLIENT_ID );
  }
  return (
    <>
      
    </>
  );
}

export default App;

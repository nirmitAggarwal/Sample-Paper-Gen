import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserAuth from './components/UserAuth';
import MainUploader from './components/MainUploader';

function App() {

  return (
        <>
          <Router>
            <Routes>
              <Route exact path="/" element={<UserAuth />} />
              <Route path="/home" element={<MainUploader />} />
            </Routes>
          </Router>
        </>
  );
}

export default App;

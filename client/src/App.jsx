import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserAuth from './components/UserAuth';
import NavBar from './components/navbar';
import MainUploader from './components/mainUploader';

function App() {

  return (
        
<div>
      <div className="container mx-auto mt-4">
        <NavBar />
          <Router>
            <Routes>
              <Route exact path="/" element={<UserAuth />} />
              <Route path="/home" element={<MainUploader />} />
            </Routes>
          </Router>
      </div>
</div>

  );
}

export default App;

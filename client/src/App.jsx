import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserAuth from './components/UserAuth';
import NavBar from './components/navbar';
import MainUploader from './components/mainUploader';

function App() {

  return (
        
<div className=''>
      <div className="container mx-auto ">
        <NavBar />
        <div className='block h-20 w-[100%] bg-gray-800'></div>
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

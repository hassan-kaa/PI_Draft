import './App.css';
import UserProfile from './views/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './views/Register';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Login from './views/Login';
function App() {
  return (
    <div className="App">
        <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

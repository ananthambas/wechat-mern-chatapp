import { useContext } from 'react';
import './App.scss';
import { AuthContext } from './context/authContext/AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/register/Register';
import Topbar from './pages/Topbar/Topbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
     <Router>
        <Routes>

          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

          </Routes>
      </Router>
    {/* <Home />
      {user? <Home/> : <Login />}
      <Register /> */}
    </div>
  );
}

export default App;

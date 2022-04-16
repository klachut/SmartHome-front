
import './App.css';
import Login from './components/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';

function App() {

  const [user, setUser] = useState(null);
  const [sensors, setSensors] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('smartHomeUser')
    setUser(null)
  }

  useEffect(()=> {
    const response = localStorage.getItem('smartHomeUser')
    if(response) {
      setUser(JSON.parse(response));
    }
  }, [])

  return (
   <div>
     <Routes>
        <Route path="/login" element={<Login  setUser={setUser} user={user}/>} />
        <Route path="/register" element={<Register user={user}/>} />
        {user ? 
        <>
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} handleLogout={handleLogout} sensors={sensors} setSensors={setSensors} />}/>
        <Route path="/admin-panel" element={<AdminPanel user={user} setUser={setUser} handleLogout={handleLogout} setSensors={setSensors}/>}/>
        </>
        
         : null}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
   </div>
  );
}

export default App;

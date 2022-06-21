import "./App.css";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import { io } from "socket.io-client";

function App() {
  const [user, setUser] = useState(null);
  const [sensors, setSensors] = useState([]);
  const socketRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("smartHomeUser");
    setUser(null);
  };

  useEffect(() => {
    const response = localStorage.getItem("smartHomeUser");
    if (response) {
      setUser(JSON.parse(response));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    socketRef.current = io(process.env.REACT_APP_URL_BASE);
    socketRef.current.on("connect", () => {
      console.log("connect to websocket");
    });
    socketRef.current.on("add sensor", (newSensor) => {
      console.log("new sensor was added", newSensor);
      setSensors((prevSensors) => [...prevSensors, newSensor]);
    });
    socketRef.current.on("update sensor", (updatedSensor) => {
      console.log("sensor was updated", updatedSensor);

      setSensors((prevSensors) =>
        prevSensors.map((sensor) =>
          sensor._id === updatedSensor._id ? updatedSensor : sensor
        )
      );
    });
    socketRef.current.on("remove sensor", (id) => {
      console.log("sensor was removed", id);
      setSensors((prevSensors) =>
        prevSensors.filter((sensor) => sensor._id !== id)
      );
    });
    return () => socketRef.current.disconnect();
  }, [user]);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<Login setUser={setUser} user={user} />}
        />
        <Route path="/register" element={<Register user={user} />} />
        {user ? (
          <>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  user={user}
                  setUser={setUser}
                  handleLogout={handleLogout}
                  sensors={sensors}
                  setSensors={setSensors}
                />
              }
            />
            <Route
              path="/admin-panel"
              element={
                <AdminPanel
                  user={user}
                  setUser={setUser}
                  handleLogout={handleLogout}
                  setSensors={setSensors}
                />
              }
            />
          </>
        ) : null}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;

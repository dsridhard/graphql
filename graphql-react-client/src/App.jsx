import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./pages/Login";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import Logout from "./components/Logout";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        {user && <Logout onLogout={setUser} />}
        <Routes>
          <Route
            path="/login"
            element={!user ? <LoginScreen onLogin={setUser} /> : <Navigate to="/users" />}
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/tasks"
            element={user ? <Tasks user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/users" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
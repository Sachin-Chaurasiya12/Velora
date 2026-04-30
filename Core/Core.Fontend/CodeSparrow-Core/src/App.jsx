import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./RegisterPageLayout";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* default */}
      <Route path="/" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;

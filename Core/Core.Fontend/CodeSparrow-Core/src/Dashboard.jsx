import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/api/user/profile");
      setProfile(res.data);
    } catch {
      navigate("/");
    }
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <div style={{
        width: 200,
        background: "#2c3e50",
        color: "white",
        height: "100vh",
        padding: 20
      }}>
        <h3>Dashboard</h3>
        <button onClick={loadProfile}>Profile</button>
      </div>

      {/* Main */}
      <div style={{ padding: 30, flex: 1 }}>
        <h2>Welcome 🎉</h2>

        {profile && (
          <div>
            <p>Email: {profile.email}</p>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        )}

        <button onClick={logout}>Logout</button>
      </div>

    </div>
  );
}

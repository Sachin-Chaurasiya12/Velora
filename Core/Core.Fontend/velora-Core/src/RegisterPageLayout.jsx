import { useState } from "react";
import bg from "./assets/premium_vector-1713201017366-f764a073f393.webp";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("Account created successfully! Welcome to Velora 🚀");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <style>{`
        /* RESET & GLOBALS */
        html, body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        font-family: 'Inter', system-ui, sans-serif;

        background: radial-gradient(circle at top left, #f8f8f8, #c1cd82);
        }

        #root { width: 100%; }
        * { box-sizing: border-box; }

        .auth-wrapper {
          width: 100%; min-height: 100vh;
          display: flex; justify-content: center; align-items: center; padding: 20px;
        }

        .auth-card {
          width: 100%; max-width: 1000px; min-height: 650px;
          display: flex; border-radius: 24px; overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); background: white;
        }

        /* LEFT CONTENT */
        .left {
          flex: 1; padding: 50px 60px;
          display: flex; flex-direction: column; justify-content: center;
        }

        .brand {
          font-weight: 800; font-size: 25px; margin-bottom: 25px;
          color: #6366f1; text-transform: uppercase; letter-spacing: 1px;
        }

        h2 { font-size: 32px; font-weight: 700; margin: 0 0 8px 0; color: #1a1a1a; }
        .sub { font-size: 15px; color: #666; margin-bottom: 30px; }

        input {
          width: 100%; padding: 14px 16px; margin-bottom: 14px;
          border-radius: 12px; border: 1px solid #e2e8f0;
          background: #f8fafc; outline: none; font-size: 14px;
        }

        input:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }

        button {
          width: 100%; padding: 14px; border-radius: 12px; border: none;
          background: #111827; color: white; font-weight: 600;
          font-size: 16px; cursor: pointer; margin-top: 10px;
        }

        button:hover { background: #000; }

        .small { margin-top: 25px; font-size: 14px; text-align: center; color: #666; }
        .small a { color: #6366f1; text-decoration: none; font-weight: 600; }

        /* RIGHT IMAGE */
        .right {
          flex: 1.1; position: relative;
          background-size: cover; background-position: center;
        }

        .quote {
          position: absolute; bottom: 30px; left: 30px; right: 30px;
          background: rgba(255, 255, 255, 0.8); padding: 24px;
          border-radius: 20px; backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .bg-blobs {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.blob {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.b1 {
  background: #6366f1;
  top: -100px;
  left: -100px;
}

.b2 {
  background: #22c55e;
  bottom: -120px;
  right: -120px;
}

.b3 {
  background: #d8abc2;
  top: 40%;
  left: 50%;
}
    .bg-blobs {
  position: fixed;
  inset: 0;
  z-index: 0;   /* background layer */
  pointer-events: none; /* VERY IMPORTANT */
}

        @media (max-width: 850px) {
          .right { display: none; }
          .auth-card { max-width: 450px; height: auto; }
        }
      `}</style>
    <div className="bg-blobs">
  <div className="blob b1"></div>
  <div className="blob b2"></div>
  <div className="blob b3"></div>
</div>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="left">
            <div className="brand">Velora</div>
            
            <h2>Create Account</h2>
            <div className="sub">Join us and start your journey today.</div>
            
            <input 
              type="text" 
              name="fullName"
              placeholder="Full Name" 
              value={formData.fullName} 
              onChange={handleChange} 
            />

            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange} 
            />
            
            <input 
              type="password" 
              name="password"
              placeholder="Create Password" 
              value={formData.password} 
              onChange={handleChange} 
            />

            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
            
            <button onClick={handleRegister} disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            
            <div className="small">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>

          <div className="right" style={{ backgroundImage: `url(${bg})` }}>
            {/* <div className="quote">
              <b>John Muir</b>
              “Explore untouched landscapes, breathtaking trails, and hidden wonders of nature.”
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
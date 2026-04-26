import { useState } from "react";
import { Link } from "react-router-dom";
import bg from "./assets/loginimage.webp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert("Login successful 🚀");
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <style>{`
        html, body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        font-family: 'Inter', system-ui, sans-serif;

        background: radial-gradient(circle at top left, #f8f8f8, #7bca9a);
        }


        #root {
          width: 100%;
        }

        * {
          box-sizing: border-box;
        }

        /* WRAPPER */
        .auth-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        /* CARD */
        .auth-card {
          width: 100%;
          max-width: 1000px;
          height: 600px;
          display: flex;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(19, 17, 17, 0.15);
          background: white;
        }

        /* LEFT */
        .left {
          flex: 1;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brand {
          font-weight: 800;
          font-size: 25px;
          margin-bottom: 30px;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        h2 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #1a1a1a;
        }

        .sub {
          font-size: 15px;
          color: #666;
          margin-bottom: 30px;
        }

        input {
          width: 100%;
          padding: 14px 16px;
          margin-bottom: 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          outline: none;
          font-size: 14px;
        }

        input:focus {
          border-color: #6366f1;
          background: #fff;
        }

        button {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: #111827;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: 0.2s;
        }

        button:hover {
          background: #000;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .small {
          margin-top: 25px;
          font-size: 14px;
          text-align: center;
          color: #666;
        }

        .small a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
        }

        /* RIGHT */
        .right {
          flex: 1.1;
          position: relative;
          background-image: url(${bg});
          background-size: cover;
          background-position: center;
        }

        .quote {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          background: rgba(255, 255, 255, 0.8);
          padding: 24px;
          border-radius: 20px;
          backdrop-filter: blur(12px);
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
  background: #ec4899;
  top: 40%;
  left: 50%;
}
  .bg-blobs {
  position: fixed;
  inset: 0;
  z-index: 0;   /* background layer */
  pointer-events: none; /* VERY IMPORTANT */
}



        /* RESPONSIVE */
        @media (max-width: 850px) {
          .right {
            display: none;
          }

          .auth-card {
            max-width: 450px;
            height: auto;
          }
        }
      `}</style>
    <div className="bg-blobs">
  <div className="blob b1"></div>
  <div className="blob b2"></div>
  <div className="blob b3"></div>
</div>

      <div className="auth-wrapper">
        <div className="auth-card">

          {/* LEFT */}
          <div className="left">
            <div className="brand">Velora</div>

            <h2>Welcome Back!</h2>
            <div className="sub">Let’s get you signed in securely.</div>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Log In"}
            </button>

            <button
            onClick={() => (window.location.href = "/auth/google")}
            style={{
              marginTop: "12px",
              background: "#fff",
              color: "#111827",
              border: "1px solid #e5e7eb",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.9-6.9C35.9 2.34 30.4 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.06 6.26C12.6 13.08 17.88 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.64-.15-3.21-.43-4.72H24v9.02h12.6c-.54 2.9-2.18 5.37-4.64 7.03l7.19 5.58C43.98 37.04 46.5 31.32 46.5 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.62 28.48a14.5 14.5 0 010-8.96L2.56 13.22A24 24 0 000 24c0 3.84.9 7.46 2.56 10.78l8.06-6.3z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.19-5.58c-2.01 1.35-4.6 2.16-8.71 2.16-6.12 0-11.4-3.58-13.38-8.82l-8.06 6.3C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            Continue with Google
          </button>



            <div className="small">
              Don’t have an account? <Link to="/register">Sign Up</Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right">
            {/* <div className="quote">
              <b>John Muir</b>
              <div>
                “Explore untouched landscapes, breathtaking trails, and hidden wonders of nature.”
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;

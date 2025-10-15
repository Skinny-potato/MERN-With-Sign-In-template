// src/components/AuthContainer.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../resources/styles/AuthContainer.css"; // <- contains colour-pallette.css import
import { config } from "../Config/config";
import { useAuth } from "../resources/Auth/Auth-context";

const AuthContainer = () => {
  const navigate = useNavigate();
  const { authType } = useParams(); // comes from /auth/:authType
  const mode = authType === "register" ? "register" : "login";
  const isLogin = mode === "login";
  const { signIn } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const sliderStyle = useMemo(
    () => ({ transform: `translateX(${isLogin ? "0%" : "100%"})` }),
    [isLogin]
  );

  const trackStyle = useMemo(
    () => ({ transform: `translateX(${isLogin ? "0%" : "-50%"})` }),
    [isLogin]
  );

  const switchTo = (next) => navigate(`/auth/${next}`);

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${config.domain}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save JWT token
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      console.log("Login successful:", data);

      // Redirect user after login
      signIn({ username: data.username });

      navigate("/afterlogin")

    } catch (err) {
      console.error("Login error:", err.message);
      alert(err.message);
    }
  };


  const onRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${domain}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Save JWT token
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      console.log("Registration successful:", data);

      // Redirect user after register
      // Redirect user after login
      signIn({ username: data.username });
      navigate("/afterlogin")
      
      
    } catch (err) {
      console.error("Register error:", err.message);
      alert(err.message);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>

        <div className="switcher">
          <div className="slider" style={sliderStyle} />
          <button type="button" data-active={isLogin} onClick={() => switchTo("login")}>
            Login
          </button>
          <button
            type="button"
            data-active={!isLogin}
            onClick={() => switchTo("register")}
          >
            Register
          </button>
        </div>

        <div className="forms-viewport">
          <div className="forms-track" style={trackStyle}>
            {/* LOGIN */}
            <form className="form" onSubmit={onLoginSubmit}>
              <fieldset>
                <div className="row">
                  <label htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm((s) => ({ ...s, email: e.target.value }))
                    }
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="row">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((s) => ({ ...s, password: e.target.value }))
                    }
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button className="submit-btn" type="submit" style={{ marginLeft: "0.4rem" }}>
                  Sign in
                </button>

                <p className="helper">
                  New here?{" "}
                  <a onClick={() => switchTo("register")}>Create an account</a>
                </p>
              </fieldset>
            </form>

            {/* REGISTER */}
            <form className="form" onSubmit={onRegisterSubmit}>
              <fieldset>
                <div className="row">
                  <label htmlFor="reg-name">Full name</label>
                  <input
                    id="reg-name"
                    type="text"
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm((s) => ({ ...s, name: e.target.value }))
                    }
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="row">
                  <label htmlFor="reg-email">Email</label>
                  <input
                    id="reg-email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm((s) => ({ ...s, email: e.target.value }))
                    }
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="row">
                  <label htmlFor="reg-password">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm((s) => ({
                        ...s,
                        password: e.target.value,
                      }))
                    }
                    required
                    autoComplete="new-password"
                  />
                </div>

                <div className="row">
                  <label htmlFor="reg-confirm">Confirm password</label>
                  <input
                    id="reg-confirm"
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm((s) => ({
                        ...s,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                    autoComplete="new-password"
                  />
                </div>

                <button className="submit-btn" type="submit">
                  Create account
                </button>

                <p className="helper">
                  Already have an account?{" "}
                  <a onClick={() => switchTo("login")}>Sign in</a>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;

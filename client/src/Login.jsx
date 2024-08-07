import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      let result = await response.json();

      // Handle successful login
      if (result === "Success") {
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/home');
      } else {
        // Handle login failure
        alert(result);
      }

      // Clear input fields
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  return (
    <div className="bg-primary d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '800px' }}>
        <h3 className="text-center mb-4">Log In</h3>
        <form onSubmit={collectData}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-center mt-3">
            <span>Don't have an account? <a href="/register" className="text-link">Sign Up</a></span>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary btn-block w-100">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

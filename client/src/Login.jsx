import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Ensure credentials are included in requests
  axios.defaults.withCredentials = true;

  // Handle form submission with fetch
  const collectData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensure credentials are included
        });

        let result = await response.json(); // Parse the JSON response

        if (result.Login) { // Check for 'Login' in the response object
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/home'); // Navigate to home page on success
        } else {
            alert(result.message);
        }

        setEmail("");
        setPassword("");

    } catch (error) {
        console.error("Error submitting data:", error); // Log error if fetch fails
    }
};


  return (
    <div className="bg-primary d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '800px' }}>
        <h3 className="text-center mb-4">Log In</h3>
        <form onSubmit={collectData}> {/* Use collectData as the form submit handler */}
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

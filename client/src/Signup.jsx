import React, { useState } from 'react'; 
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useNavigate } from 'react-router-dom';

function Signup() {
  // State to hold form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const collectData = async (e) => {
      e.preventDefault();
      try {
          let result = await fetch('http://localhost:3000/register', {
              method: 'POST',
              body: JSON.stringify({ name, email, password }),
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          result = await result.json(); // Ensure this is a function call
          localStorage.setItem("user", JSON.stringify(result));
          console.log(result)
          // Clear input fields
          setName("");
          setEmail("");
          setPassword("");

          // Optional: Show a success message
          alert("Data submitted successfully!");
          navigate('/login')

      }
      catch (error) {
          console.error("Error submitting data:");
      }
  }

  return (
    <div className="bg-primary d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '800px' }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={collectData}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Fixed syntax error here
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
            <span>Already have an account? <a href="/login" className="text-link">Log In</a></span>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary btn-block w-100">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

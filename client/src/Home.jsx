import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(res => {
        console.log(res);
        if (res.data.valid) {
          setName(res.data.name); 
        } else {
          navigate('/login'); 
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.post('http://localhost:3000/logout')
      .then(res => {
        if (res.data.success) {
          navigate('/login'); // Redirect to login page after logout
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Our Website</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
            </ul>
            {/* Search Bar */}
            <form className="d-flex me-2">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            {/* Logout Button */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
              <span className='white' style={{ marginLeft: '10px', color: 'white' }}>{name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className=' align-items-center justify-content-center'>
        <header
          className="bg-primary text-white text-center"
          style={{
            padding: '120px 0',
            backgroundPosition: 'center',
          }}
        >
          <div className="container">
            <h1 className="display-4">
              Welcome <span>{name}</span> to Our Website
            </h1>
            <p className="lead">Discover the amazing features and benefits we offer.</p>
            <a href="#features" className="btn btn-lg btn-light mt-4">
              Learn More
            </a>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Home;

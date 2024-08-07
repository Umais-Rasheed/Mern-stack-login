import React from 'react'

function Home() {
  return (
    <div className='flex align-item-center'>
      <header className="bg-primary text-white text-center" style={{padding: '120px 0', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container">
          <h1 className="display-4">Welcome to Our Website</h1>
          <p className="lead">Discover the amazing features and benefits we offer.</p>
          <a href="#features" className="btn btn-lg btn-light mt-4">
            Learn More
          </a>
        </div>
      </header> 
    </div>
  )
}

export default Home

import React from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate("/") // LoginSignup page is at the root path ("/")
  }

  return (
    <div className="home">
      <h2>Welcome to our website</h2>
      <h3>This is a simple homepage created using React.</h3>
      <button id="logoutBtn" onClick={handleSignOut}> Logout </button>
    </div>
  )}

export default Home
import React from 'react'
import "./loader.css"


function Loader() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#111111"
    }}>
      <div className="loader">
        <div className="inner"></div>
      </div>
    </div>
  )
}

export default Loader

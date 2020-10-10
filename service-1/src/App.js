import React from 'react'

import './App.css'
import logo from './logo.svg'

function App({context}) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={`${process.env.REACT_APP_CONTENT_HOST}${logo}`} className="App-logo" alt="logo" />
        <p>
          Service 1
        </p>
        <a
          className="App-link"
          href="/service-2"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import googleLogo from './assets/google.png'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src={googleLogo} alt="Google Logo" className="max-w-md"/>
      </div>
    </div>
  )
}

export default App

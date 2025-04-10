import { useState } from 'react'
import googleLogo from './assets/google.png'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-0.5">
        
        <div className='flex flex-col items-center gap-7'>
        <img src={googleLogo} alt="Google Logo" className="max-w-xs"/>
        <p>Search 1,326,920,000 webpages</p>
        </div>
        
        <input type="text" className="border border-black w-md"/>
      
        <div className="flex items-center gap-0.5">
          <button className="text-white">Google Search</button>
          <button className="text-white">I'm Feeling Lucky</button>
        </div>
      
      </div>
    </div>
  )
}

export default App

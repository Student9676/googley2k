import { useState } from 'react'
import googleLogo from './assets/google.png'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('');
  
  return (
    // normal centering looks uncentered so i added a static margin. plz change it if you know how to make it dynamic/better
    <div className="min-h-screen flex items-center justify-center mt-[-30px]"> 
      <div className="flex flex-col items-center gap-0.5">
        
        <div className='flex flex-col items-center gap-7'>
        <img src={googleLogo} alt="Google Logo" className="max-w-xs"/>
        <p>Search 1,326,920,000 webpages</p>
        </div>
        
        <input value={searchText} 
        onChange={(e)=>setSearchText(e.target.value)} 
        type="text" 
        className="border border-black w-md"/>
      
        <div className="flex items-center gap-0.5">
          <button 
          className="text-white" 
          onClick={() => alert(`Searching for: ${searchText}`)}>
            Google Search
          </button>
          <button className="text-white">I'm Feeling Lucky</button>
        </div>
      
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import googleLogo from './assets/google.png'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('');
  const [snapshotUrl, setSnapshotUrl] = useState('');

  const cleanInput=(input: string)=>{
    let cleaned = input.trim().toLowerCase();
    if(!cleaned.includes('.')) cleaned+= '.com';
    if(!cleaned.startsWith('http')) cleaned= 'http://' + cleaned;
    return cleaned;
  };

  const fetchWaybackSnapshot= async(url: string, date: string)=> {
    try{
    const api = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}&timestamp=${date}`;
    const res = await fetch(api);
    const data = await res.json();
    console.log(`Checking ${date}:`, data);
    return data.archived_snapshots?.closest?.url||null;
  } catch (error){
    console.error("Error fetching from Wayback", error);
    return null;
  }
};

  const handleSearch = async () => {
    const domain = cleanInput(searchText);
    const fallbackTimestamps = [
      '20130919044612',
      '20130815000000',
      '20121005000000',
      '20111225000000',
      '20101111000000'
  ];

    setSnapshotUrl(''); // Clear old snapshot
  for (const year of fallbackTimestamps) {
    const archived = await fetchWaybackSnapshot(domain, year);
    if (archived) {
      setSnapshotUrl(archived);
      console.log("Found snapshot:", archived);
      return;
    }
  }
  alert('No snapshots found!');
};

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-purple-300 flex flex-col items-center justify-center px-4">
      
      {/* LOGO + Tagline */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <img src={googleLogo} alt="Google Logo" className="max-w-xs" />
        <p className="text-sm font-mono text-gray-800">
          Search 1,326,920,000 webpages
        </p>
      </div>

      {/* SEARCH INPUT */}
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Enter your search..."
        className="w-full max-w-md px-4 py-2 border-2 border-gray-400 rounded-md shadow-inner mb-4 font-mono text-sm"
      />

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={handleSearch}
          className="bg-slate-100 border-2 border-gray-400 px-4 py-2 rounded-md font-bold font-mono text-sm hover:bg-purple-200 hover:shadow-lg transition-all"
        >
          Google Search
        </button>

        <button
          className="bg-slate-100 border-2 border-gray-400 px-4 py-2 rounded-md font-bold font-mono text-sm hover:bg-purple-200 hover:shadow-lg transition-all"
        >
          I'm Feeling Lucky
        </button>
      </div>

      {/* SNAPSHOT RESULT*/}
      {/* SNAPSHOT RESULT */}
      {snapshotUrl && (
        <>
          <iframe
            src={snapshotUrl}
            className="w-full max-w-5xl h-[80vh] border-2 border-gray-500 shadow-lg"
            title="Wayback Snapshot"
          />
          <div className="text-sm text-gray-800 mt-2 font-mono">
            Loaded from: <a href={snapshotUrl} target="_blank" className="underline">{snapshotUrl}</a>
          </div>
        </>
      )}
    </div>
  );
}

export default App
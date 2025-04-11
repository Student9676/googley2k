import { useLocation, useNavigate } from 'react-router-dom';
import Clippy from './Clippy';
import clippyJumping from './assets/clippy_jumping.gif';
import { useState } from 'react';

function Snapshot() {
  const location = useLocation();
  const navigate = useNavigate();
  const snapshotUrl = location.state?.snapshotUrl;
  const [isLoading, setIsLoading] = useState(true);


  if (!snapshotUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-gray-800 font-press p-6">
        <h2 className="text-xl mb-4">No snapshot found!</h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 border-2 border-gray-400 bg-white hover:bg-gray-100"
        >
          Go Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-purple-300 flex flex-col items-center p-0">
      
      {/* LOADING OVERLAY */}
     {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-pink-200 to-purple-300 bg-opacity-80">
          <img src={clippyJumping} alt="Loading Clippy" className="w-12.5" />
          <p className="text-sm text-gray-700 font-press mt-2">Clippy is loading the snapshot...</p>
        </div>
      )}
      
      <div className="w-full bg-gray-100 border-b border-gray-300 px-4 py-2 flex justify-between items-center font-press text-sm">
        <button onClick={() => navigate('/')} className="text-purple-700 font-press hover:underline">
          ← Back to Search
        </button>
        <a href={snapshotUrl} target="_blank" className="text-purple-700 font-press hover:underline">
          Open in New Tab
        </a>
      </div>

      <iframe
        src={snapshotUrl}
        title="Wayback Snapshot"
        onLoad={() => setIsLoading(false)}
        className="w-full max-w-[95vw] h-[92vh] border-2 border-gray-500 shadow-lg mt-4"
      />
      <div className={`text-sm text-gray-800 mt-2 font-press ${isLoading ? 'hidden' : 'block'}`}>
        Viewing snapshot: <a href={snapshotUrl} className="underline" target="_blank">{snapshotUrl}</a>
      </div>

      <Clippy className={`${isLoading ? 'hidden' : 'block'}`} message="You’re viewing a vintage webpage!" />
    </div>
  );
}

export default Snapshot;
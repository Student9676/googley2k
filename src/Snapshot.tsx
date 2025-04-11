import { useLocation, useNavigate } from 'react-router-dom';
import Clippy from './Clippy';

function Snapshot() {
  const location = useLocation();
  const navigate = useNavigate();
  const snapshotUrl = location.state?.snapshotUrl;

  if (!snapshotUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-gray-800 font-mono p-6">
        <h2 className="text-xl mb-4">No snapshot found!</h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 border-2 border-gray-400 bg-white rounded-md hover:bg-gray-100"
        >
          Go Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-purple-300 flex flex-col items-center p-0">
      <div className="w-full bg-gray-100 border-b border-gray-300 px-4 py-2 flex justify-between items-center font-mono text-sm">
        <button onClick={() => navigate('/')} className="text-blue-700 hover:underline">
          ← Back to Search
        </button>
        <a href={snapshotUrl} target="_blank" className="text-blue-700 hover:underline">
          Open in New Tab
        </a>
      </div>

      <iframe
        src={snapshotUrl}
        title="Wayback Snapshot"
        className="w-full max-w-[95vw] h-[92vh] border-2 border-gray-500 shadow-lg mt-4"
      />
      <div className="text-sm text-gray-800 mt-2 font-mono">
        Viewing snapshot: <a href={snapshotUrl} className="underline" target="_blank">{snapshotUrl}</a>
      </div>

      <Clippy message="You’re viewing a vintage webpage!" />
    </div>
  );
}

export default Snapshot;
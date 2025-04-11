import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from './assets/google.png';
import clippyJumping from './assets/clippy_jumping.gif';
import './App.css';
import Clippy from './Clippy';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const cleanInput = (input: string) => {
    let cleaned = input.trim().toLowerCase();
    if (!cleaned.includes('.')) cleaned += '.com';
    if (!cleaned.startsWith('http')) cleaned = 'http://' + cleaned;
    return cleaned;
  };

  const snapshotRanges: { [key: string]: string[] } = {
    "instagram.com": ['20161201000000', '20141001000000', '20130101000000'],
    "facebook.com": ['20141201000000', '20111225000000', '20081201000000'],
    "google.com": ['20021201000000', '20011225000000', '20010401000000'],
    "youtube.com": ['20131201000000', '20101201000000', '20081201000000'],
    "default": ['20141201000000', '20101201000000', '20031001000000']
  };

  const getTimestampsForDomain = (domain: string): string[] => {
    for (const key in snapshotRanges) {
      if (domain.includes(key)) return snapshotRanges[key];
    }
    return snapshotRanges["default"];
  };

  const fetchWaybackSnapshot = async (url: string, date: string) => {
    try {
      const api = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}&timestamp=${date}`;
      const res = await fetch(api);
      const data = await res.json();
      return data.archived_snapshots?.closest?.url || null;
    } catch (error) {
      console.error('Error fetching from Wayback', error);
      return null;
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const domain = cleanInput(searchText);
    const timestamps = getTimestampsForDomain(domain);

    for (const year of timestamps) {
      const archived = await fetchWaybackSnapshot(domain, year);
      if (archived) {
        setTimeout(() => {
          setIsLoading(false);
          navigate('/snapshot', { state: { snapshotUrl: archived } });
        }, 1500);
        return;
      }
    }

    setIsLoading(false);
    navigate('/snapshot', { state: { snapshotUrl: fallbackSearch } });
  };

  const handleLucky = async () => {
    setIsLoading(true);
    const classics = [
      'askjeeves.com', 'altavista.com', 'toyota.com', 'aol.com', 'lycos.com',
      'excite.com', 'myspace.com', 'photobucket.com', 'delicious.com', 'digg.com',
      'google.com', 'yahoo.com', 'ask.com', 'baidu.com', 'yandex.com',
      'googleplus.com', 'youtube.com', 'instagram.com', 'facebook.com'
    ];
    const randomPick = classics[Math.floor(Math.random() * classics.length)];
    const domain = cleanInput(randomPick);
    const timestamps = getTimestampsForDomain(domain);

    for (const year of timestamps) {
      const archived = await fetchWaybackSnapshot(domain, year);
      if (archived) {
        setTimeout(() => {
          setIsLoading(false);
          navigate('/snapshot', { state: { snapshotUrl: archived } });
        }, 1500);
        return;
      }
    }

    setIsLoading(false);
    const fallbackSearch = `https://web.archive.org/web/*/${domain}`;
    window.open(fallbackSearch, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-purple-300 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <img src={googleLogo} alt="Google Logo" className="max-w-xs" />
        <p className="text-sm font-mono text-gray-800">
          Search 1,326,920,000 webpages
        </p>
      </div>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Enter your search..."
        className="w-full max-w-md px-4 py-2 border-2 border-gray-400 rounded-md shadow-inner mb-4 font-mono text-sm"
      />

      <div className="flex gap-4">
        <button
          onClick={handleSearch}
          className="bg-slate-100 border-2 border-gray-400 px-4 py-2 rounded-md font-bold font-mono text-sm hover:bg-purple-200 hover:shadow-lg transition-all"
        >
          Google Search
        </button>

        <button
          onClick={handleLucky}
          className="bg-slate-100 border-2 border-gray-400 px-4 py-2 rounded-md font-bold font-mono text-sm hover:bg-purple-200 hover:shadow-lg transition-all"
        >
          I'm Feeling Lucky
        </button>
      </div>

      {isLoading && (
        <div className="mt-6 flex flex-col items-center">
          <img src={clippyJumping} alt="Loading Clippy" className="w-24 h-24 animate-bounce" />
          <p className="text-sm text-gray-700 font-mono mt-2">Clippy is searching...</p>
        </div>
      )}
    </div>
  );
}

export default Home;
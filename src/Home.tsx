import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clippyJumping from './assets/clippy_jumping.gif';
import './App.css';
import { Widget, CalanderWidget } from './Widget';
import Clippy from './Clippy';


function Home() {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const cleanInput = (input: string) => {
    let cleaned = input.trim().toLowerCase();

  const isLikelyDomain = cleaned.includes('.') || cleaned.includes('http');
  if (!isLikelyDomain && knownSites.includes(cleaned)) {
    cleaned += '.com';
  }

  if (!cleaned.startsWith('http')) cleaned = 'http://' + cleaned;
  return cleaned;
  };

  const knownSites = [
    'askjeeves.com', 'altavista.com', 'aol.com', 'excite.com', 
  'netscape.com', 'hotmail.com', 'msn.com', 'livejournal.com',
  'xanga.com', 'slashdot.org', 'somethingawful.com', 'neopets.com','ebay.com',
  'amazon.com', 'newgrounds.com', 'myspace.com', 'photobucket.com',
  'friendster.com', 'hi5.com', 'flickr.com', 'delicious.com', 'stumbleupon.com',
  'deviantart.com', 'gaiaonline.com', 'blogger.com', 'tumblr.com', 'reddit.com', 'youtube.com',
  'facebook.com', 'instagram.com', 'twitter.com', 'tiktok.com', 'snapchat.com', 'pinterest.com',
  'linkedin.com', 'whatsapp.com', 'twitch.tv', 'discord.com', 'spotify.com', 'netflix.com',
  'hulu.com', 'apple.com', 'baidu.com', 'yandex.com', 'niconico.jp', 'vk.com',
  'qq.com', 'naver.com', 'daum.net', 'toyota.com', 'nintendo.com', 'playstation.com',
  'pepsi.com', 'coca-cola.com', 'nike.com', 'adidas.com', 'lego.com', 'mattel.com',
  'barbie.com'
  ];
  

  const snapshotRanges: { [key: string]: string[] } = {
    "instagram.com": ['20161201000000', '20141001000000', '20130101000000'],
    "facebook.com": ['20141201000000', '20111225000000', '20081201000000'],
    "google.com": ['20051101180134', '20030902000530', '20011220012356', '20021201000000', '20011225000000', '20010401000000'],
    "youtube.com": ['20131201000000', '20101201000000', '20081201000000'],
    "default": ['20141201000000', '20101201000000', '20031001000000']
  };

  const getTimestampsForDomain = (domain: string): string[] => {
    const lower = domain.toLowerCase();

    if(lower.includes("google.com")){
      return['20051101180134', '20030902000530', '20011220012356'];
    }
    for(const key in snapshotRanges){
      if(lower.includes(key)) return snapshotRanges[key];
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
      const input = searchText.trim().toLowerCase();
      const isDomain = input.includes('.') || input.includes('http');
    
      if (!isDomain) {
        const keyword = encodeURIComponent(input);
    
        const googleTimestamps = getTimestampsForDomain("google.com");
        for (const ts of googleTimestamps) {
          const googleImageURL = `http://images.google.com/images?q=${keyword}`;
          const archived = await fetchWaybackSnapshot(googleImageURL, ts);
          if (archived) {
            setIsLoading(false);
            navigate('/snapshot', { state: { snapshotUrl: archived } });
            return;
          }
        }
    
        const yahooTimestamps = getTimestampsForDomain("yahoo.com");
        for (const ts of yahooTimestamps) {
          const yahooImageURL = `http://images.search.yahoo.com/search/images?p=${keyword}`;
          const archived = await fetchWaybackSnapshot(yahooImageURL, ts);
          if (archived) {
            setIsLoading(false);
            navigate('/snapshot', { state: { snapshotUrl: archived } });
            return;
          }
        }
    
        const askTimestamps = getTimestampsForDomain("ask.com");
        for (const ts of askTimestamps) {
          const askURL = `http://web.ask.com/web?q=${keyword}`;
          const archived = await fetchWaybackSnapshot(askURL, ts);
          if (archived) {
            setIsLoading(false);
            navigate('/snapshot', { state: { snapshotUrl: archived } });
            return;
          }
        }
        
        const fallback = `https://web.archive.org/web/*/http://images.google.com/images?q=${keyword}`;
        setIsLoading(false);
        navigate('/snapshot', { state: { snapshotUrl: fallback } });
        return;
      }
    
      const domain = cleanInput(input);
      const timestamps = getTimestampsForDomain(domain);
    
      for (const ts of timestamps) {
        const archived = await fetchWaybackSnapshot(domain, ts);
        if (archived) {
          setTimeout(() => {
            setIsLoading(false);
            navigate('/snapshot', { state: { snapshotUrl: archived } });
          }, 1500);
          return;
        }
      }
    
      const fallbackSearch = `https://web.archive.org/web/*/${domain}`;
      setIsLoading(false);
      navigate('/snapshot', { state: { snapshotUrl: fallbackSearch } });
    };
    
  
  
  const handleLucky = async () => {
    setIsLoading(true);
    const classics = [
      'askjeeves.com', 'altavista.com', 'toyota.com', 'aol.com', 'lycos.com',
      'excite.com', 'myspace.com', 'photobucket.com', 'delicious.com', 'digg.com',
      'google.com', 'yahoo.com', 'ask.com', 'baidu.com', 'yandex.com',
      'googleplus.com', 'youtube.com', 'instagram.com', 'facebook.com', 'pinterest.com'
    ];
    const randomPick = classics[Math.floor(Math.random() * classics.length)];
    const domain = cleanInput(randomPick);
    const timestamps = getTimestampsForDomain(domain);

    for (const year of timestamps) {
      const archived = await fetchWaybackSnapshot(domain, year);
      if (archived) {
        navigate('/snapshot', { state: { snapshotUrl: archived } });
        return;
      }
    }

    setIsLoading(false);
    const fallbackSearch = `https://web.archive.org/web/*/${domain}`;
    window.open(fallbackSearch, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-purple-300 flex flex-col items-center justify-center px-4">
      {/* WIDGETS - Fixed to the left */}
      <div className="absolute left-8 top-10 flex flex-col gap-6">
        <Widget />
        <CalanderWidget />
      </div>
      
      {/* LOGO + Tagline */}
      <div className="flex flex-col items-center gap-4 mb-6">
      
      <h1 className="text-8xl" style={{ fontFamily: '"Libre Baskerville", serif', textShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)'
}}>
          <span className="text-blue-600">R</span>
          <span className="text-red-600">e</span>
          <span className="text-yellow-500">t</span>
          <span className="text-blue-600">r</span>
          <span className="text-green-600">o</span>
          <span className="text-red-600">S</span>
          <span className="text-yellow-500">e</span>
          <span className="text-blue-600">e</span>
          <span className="text-green-600">k</span>
        </h1>
        
        <p className="text-sm font-mono text-gray-800">
          Search to travel
        </p>
      </div>
      {/* SEARCH INPUT */}
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Enter your search..."
        className="w-full max-w-md px-4 py-2 border-2 border-gray-400 shadow-inner mb-4 font-mono text-sm"
      />

      <p className="text-xs text-gay-600 italic mt-2 mb-4 font-mono text center">
        Type a website (like <span className="font-semibold">youtube.com</span>) or a keyword (like <span className="font-semibold">Barbie</span>) to dive through the past!
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleSearch}
          className="bg-slate-100 border-2 border-gray-400 px-4 py-2 font-bold font-mono text-sm hover:bg-purple-200 hover:shadow-lg transition-all"
        >
          Search Now!
        </button>

        <button
          onClick={handleLucky}
          className="bg-slate-100 border-2 border-gray-400 px-4 py-2 font-bold font-mono text-sm hover:bg-purple-200 hover:shadow-lg transition-all"
        >
          I'm Feeling Lucky
        </button>
      </div>

      {isLoading && (
        <div className="mt-6 flex flex-col items-center">
          <img src={clippyJumping} alt="Loading Clippy" className="w-12.5" />
          <p className="text-sm text-gray-700 font-mono mt-2">Clippy is searching...</p>
        </div>
      )}
    </div>
  );
}

export default Home;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clippyJumping from './assets/clippy_jumping.gif';
import retroseekLogo from './assets/retroseek.png'
import './App.css';

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

  if (!cleaned.startsWith('http')) cleaned = 'https://' + cleaned;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-purple-300 flex flex-col items-center justify-center px-4 font-pixel text-center relative overflow-hidden">
  
      {/* LOGO */}
      <div className="flex flex-col items-center gap-1 mb-4 z-10 animate-fadeIn">
        <img
          src={retroseekLogo}
          alt="RetroSeek Logo"
          className="w-150 drop-shadow-glow animate-bounce-slow z-10"
        />
        <p className="text-sm font-press text-gray-900">Search to travel through time</p>
      </div>
  
      {/* SEARCH INPUT */}
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Enter a website or keyword..."
        className="w-full max-w-md px-4 py-2 border-2 border-purple-400 bg-white shadow-md mb-4 text-sm font-pixel outline-none focus:ring-2 focus:ring-pink-300"
      />
  
      <p className="text-xs italic mb-4 text-gray-700 font-press">
        Try <span className="font-bold">youtube.com</span> or <span className="font-bold">Barbie</span> to dive through the past!
      </p>
  
      {/* BUTTONS */}
      <div className="flex gap-4 z-10">
        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white px-5 py-2 font-press text-xs border-2 border-purple-800 shadow-lg hover:bg-purple-700 hover:scale-105 transition"
        >
          Search Now!
        </button>
  
        <button
          onClick={handleLucky}
          className="bg-pink-400 text-white px-5 py-2 font-press text-xs border-2 border-pink-600 shadow-lg hover:bg-pink-500 hover:scale-105 transition"
        >
          I'm Feeling Lucky
        </button>
      </div>
  
      {/* CLIPPY LOADER */}
      {isLoading && (
        <div className="mt-6 flex flex-col items-center z-10">
          <img src={clippyJumping} alt="Clippy loading" className="w-12.5" />
          <p className="text-xs font-pixel text-gray-800 mt-2">Clippy is searching the archives...</p>
        </div>
      )}
  
      {/* Optional shimmer background layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#fff3,transparent_70%)] opacity-10 animate-pulse z-0 pointer-events-none" />
    </div>
  );
}

export default Home;
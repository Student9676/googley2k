import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Snapshot from './Snapshot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snapshot" element={<Snapshot />} />
      </Routes>
    </Router>
  );
}

export default App;

import './Widget.css';

const Widget = () => {
  return (
    <a
      href="https://web.archive.org/web/20051007163631/http://www.weather.com/index.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="widget"
        style={{
          backgroundImage: "url('/weather.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
        }}
      >
        <h2>Weather Widget</h2>
        <p className="calendar-text">72°F and sunny 🌞</p>
      </div>
    </a>
  );
};


const CalanderWidget = () => {
  return (
    <div
      className="widget"
      style={{
        backgroundImage: "url('/pixelcalendar.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white'
      }}
    >
      <h2>Calendar</h2>
      <p className="calendar-text">PeachHacks at 1pm Today!</p>
    </div>
  );
};


export { Widget, CalanderWidget};

import { areas } from "../data";
import ntpcLogo from "../assets/logo.png";
import googleMapsLogo from "../assets/google-maps.jpeg";  
import { line, curveCatmullRom } from "d3-shape";
import { MdLocationOn, MdTripOrigin } from "react-icons/md";

function MapView({
    area,
    destination,
    onBack,
    theme,
    setTheme
})  
{
  const currentArea = areas[area];

  const {
    map: mapImage,
    routes,
    displayNames,
    googleMapsLinks,
    departments,
  } = currentArea;
  const selectedRoute = routes[destination] || [];
  const firstPoint = selectedRoute[0];
  const lastPoint = selectedRoute[selectedRoute.length - 1];
  const smoothPath = line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(curveCatmullRom.alpha(0.5))(selectedRoute);

    return (
      <div className={`map-page ${theme}`}>
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </button>

      <div className="header">
        <div className="logo-container">
          <button
            className="theme-toggle"
            onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")}
          >
          {theme === "dark" ? "☀️" : "🌙"}
          </button>
        <img src={ntpcLogo} alt="NTPC Logo" className="ntpc-logo" />
        </div>
         <h1 className="navigation-title">NTPC Simhadri Navigation</h1>
       
        {displayNames[destination] && (
          <p style={{ color: '#112ed6', fontSize: '1.2rem', marginBottom: '10px' }}>
            Routing to: <strong>{displayNames[destination]}</strong>
          </p>)}
        <button
          className="maps-btn"
          onClick={() => window.open(googleMapsLinks[destination], "_blank")}
        >
        <img src={googleMapsLogo} alt="Google Maps" className="maps-icon" />
          Open in Google Maps
        </button>
      </div>

      <div className="map-wrapper">
        <img src={mapImage} alt="Campus Map" className="map-image" />
        <svg
          className="route-overlay"
          viewBox="0 0 1400 1000"
          preserveAspectRatio="none"
        >
        {/* Glow */}
        <path
          d={smoothPath}
          className="route-glow"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Main route */}
        <path
          d={smoothPath}
          className="route-path"
          pathLength="1000"
          fill="none"
          stroke="#007BFF"
          strokeWidth="10"
          strokeLinecap="round"
        />
        </svg>
        {firstPoint && (
          <div
            className="start-marker"
            style={{
              left: `${(firstPoint[0] / 1400) * 100}%`,
              top: `${(firstPoint[1] / 1000) * 100}%`,}}
          >
          <MdTripOrigin />
          </div>)}

        {lastPoint && (
          <div
          className="destination-marker"
          style={{
            left: `${(lastPoint[0] / 1400) * 100}%`,
            top: `${(lastPoint[1] / 1000) * 100}%`,}}
          >
          <MdLocationOn />
          </div>)}
      </div>
      {departments[destination] && departments[destination].length > 0 && (
        <div className="departments-section">
          <h2>Departments at this location</h2>
          <ul className="department-list">
            {departments[destination].map((dept, index) => (
              <li key={index} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                {dept}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MapView;
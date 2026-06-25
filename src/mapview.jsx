import mapImage from "./assets/admin-campus.jpg";
import ntpcLogo from "./assets/logo.png";
import googleMapsLogo from "./assets/google-maps.jpeg";
import { line, curveCatmullRom } from "d3-shape";
import { MdLocationOn, MdTripOrigin } from "react-icons/md";

function MapView({
    destination,
    onBack,
    theme,
    setTheme
})  {

  const routes = {
    admin1: [
      [756,178], [758,206], [759,219], [762,226], [766,234], [771,239], [776,243], [786,248], [796,252], [800,254], [803,255], [806,264], [810,273], [812,286], [814,298], [815,305], [815,312], [813,325], [811,338], [807,350], [802,357], [796,364], [783,373], [770,381], [758,380], [745,378]
    ],
    admin2: [
     [756,178], [757,179], [756,201], [759,220], [784,250], [808,269], [821,296], [816,336], [820,358], [816,404], [814,442], [814,445], [814,482], [815,534], [815,577], [803,597]
    ],
    Documentation: [
     [756,178], [759,204], [768,221], [781,237], [828,251], [834,256], [863,256], [993,261]
    ],
    it: [
       [756,178], [758,206], [759,219], [762,226], [766,234], [771,239], [776,243], [786,248], [796,252], [800,254], [803,255], [806,264], [810,273], [812,286], [814,298], [815,305], [815,312], [813,325], [811,338], [807,350], [802,357], [796,364], [783,373], [714,376], [682,367], [666,338], [663,330], [656,304], [642,299], [630,273], [606,254], [588,245], [567,235], [517,235], [512,229], [512,245]
    ],
    parking1: [
      [757,179], [756,201], [759,220], [784,250], [808,269], [821,296], [816,336], [820,358], [816,404], [814,442], [814,445], [814,482], [815,534], [814,537], [814,549], [837,590], [870,604], [868,627]
    ],
    parking2: [
      [756,184], [762,208], [777,232], [794,247], [806,258], [819,272], [816,299], [814,320], [806,342], [788,368], [767,382], [739,387], [713,383], [690,373], [666,358], [654,344], [643,360], [638,380], [637,394], [638,408], [638,425], [638,550], [625,578], [589,584]
    ]
  };

  const googleMapsLinks = {
    admin1: "https://maps.app.goo.gl/ET39rTrLQ4ucsDDa7",
    admin2: "https://maps.app.goo.gl/VkijMFdoELqpQE4o7",
    Documentation: "https://maps.app.goo.gl/9sd4m5LiLLoPBay18",
    it: "https://maps.app.goo.gl/eDtMxhgdPuyAfqBZA",
    parking1: "https://maps.app.goo.gl/5r3w1qjrFVjMHC668",
    parking2: "https://maps.app.goo.gl/gEkSHRahBy1sNRYy5"
  };

  const displayNames = {
    admin1: "Samanvay",
    admin2: "Saavyas",
    Documentation: "Documentation",
    it: "IT & Communications",
    parking1: "Parking 1",
    parking2: "Parking 2"
  };

  const selectedRoute = routes[destination] || [];
  const firstPoint = selectedRoute[0];
  const lastPoint = selectedRoute[selectedRoute.length - 1];
  const departments = {
    admin1: [
      "Department 1",
      "Department 2",
      "Department 3"
    ],
    admin2: [
      "Department 1",
      "Department 2"
    ],
    Documentation: [
      "Department 1"
    ],
    it: [
      "Department 1",
      "Department 2"
    ],
    parking1: [],
    parking2: []
  };

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
        Back to Navigation
      </button>

      <div className="header">
        <div className="logo-container">
          <button
    className="theme-toggle"
    onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
    }
>
    {theme === "dark" ? "☀️" : "🌙"}
</button>
          <img src={ntpcLogo} alt="NTPC Logo" className="ntpc-logo" />
        </div>
        <h1 className="navigation-title">NTPC Simhadri Navigation</h1>
       
        {displayNames[destination] && (
          <p style={{ color: '#112ed6', fontSize: '1.2rem', marginBottom: '10px' }}>
            Routing to: <strong>{displayNames[destination]}</strong>
          </p>
        )}
        
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
 
</svg>{firstPoint && (
  <div
    className="start-marker"
    style={{
      left: `${(firstPoint[0] / 1400) * 100}%`,
      top: `${(firstPoint[1] / 1000) * 100}%`,
    }}
  >
    <MdTripOrigin />
  </div>
)}

{lastPoint && (
  <div
    className="destination-marker"
    style={{
      left: `${(lastPoint[0] / 1400) * 100}%`,
      top: `${(lastPoint[1] / 1000) * 100}%`,
    }}
  >
    <MdLocationOn />
  </div>
)}
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
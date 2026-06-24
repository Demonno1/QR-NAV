import mapImage from "./assets/admin-campus.jpg";
import ntpcLogo from "./assets/logo.png";
import googleMapsLogo from "./assets/google-maps.jpeg";
function MapView({ destination, onBack }) {

  const routes = {

    admin1: [
      [755,151],
[756,178],
[758,206],

[759,219],
[762,226],
[766,234],

[771,239],
[776,243],

[786,248],
[796,252],

[800,254],
[803,255],

[806,264],
[810,273],

[812,286],
[814,298],

[815,305],
[815,312],

[813,325],
[811,338],
[807,350],

[802,357],
[796,364],

[783,373],
[770,381],

[758,380],
[745,378]
    ],
    admin2: [
      [757,179],
[756,201],
[759,220],
[784,250],
[808,269],
[821,296],
[816,336],
[820,358],
[816,404],
[814,442],
[814,445],
[814,482],
[815,534],
[815,577],
[803,597]
    ],

    Documentation: [
      [757,148],
[759,204],
[768,221],
[781,237],
[828,251],
[834,256],
[863,256],
[993,261]
    ],

    it: [
       [755,151],
[756,178],
[758,206],

[759,219],
[762,226],
[766,234],

[771,239],
[776,243],

[786,248],
[796,252],

[800,254],
[803,255],

[806,264],
[810,273],

[812,286],
[814,298],

[815,305],
[815,312],

[813,325],
[811,338],
[807,350],

[802,357],
[796,364],

[783,373],[
  714,376],
[682,367],
[666,338],
[663,330],
[656,304],
[642,299],
[630,273],
[606,254],
[588,245],
[567,235],
[517,235],
[512,229],
[512,245]
    ],

    parking1: [
      [757,179],
[756,201],
[759,220],
[784,250],
[808,269],
[821,296],
[816,336],
[820,358],
[816,404],
[814,442],
[814,445],
[814,482],
[815,534],
[814,537],
[814,549],
[837,590],
[870,604],
[868,627]
    ],

    parking2: [
      [756,184],
[762,208],
[777,232],
[794,247],
[806,258],
[819,272],
[816,299],
[814,320],
[806,342],
[788,368],
[767,382],
[739,387],
[713,383],
[690,373],
[666,358],
[654,344],
[643,360],
[638,380],
[637,394],
[638,408],
[638,425],
[638,550],
[625,578],
[589,584]
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
  Samanvay: "Samanvay",
  Saavyas: "Saavyas",
  Documentation: "Documentation",
  IT: "IT & Communications",
  p1: "Parking 1",
  p2: "Parking 2"
};
  const selectedRoute = routes[destination] || [];

  const routePoints = selectedRoute
  .filter(point => Array.isArray(point) && point.length === 2)
  .map(([x, y]) => `${x},${y}`)
  .join(" ");
  return (
    <div className="map-page">

      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="header">
        <img
          src={ntpcLogo}
          alt="NTPC Logo"
          className="ntpc-logo"
        />

        <h1 className="navigation-title">
  NTPC Simhadri Navigation
</h1>

        <h3>
          <button
  className="maps-btn"
  onClick={() =>
    window.open(googleMapsLinks[destination], "_blank")
  }
>
  <img
    src={googleMapsLogo}
    alt="Google Maps"
    className="maps-icon"
  />
  Open in Google Maps
</button>
        </h3>
      </div>

      <div className="map-wrapper">

        <img
          src={mapImage}
          alt="Campus Map"
          className="map-image"
        />

       <svg
  className="route-overlay"
  viewBox="0 0 1400 1000"
  preserveAspectRatio="none"
>
  <polyline
    key={destination}
    className="route-path"
    points={routePoints}
    fill="none"
    stroke="#007BFF"
    strokeWidth="12"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
      </div>

    </div>
  );
}

export default MapView;
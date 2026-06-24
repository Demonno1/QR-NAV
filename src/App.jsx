import { useState } from "react";
import "./App.css";
import MapView from "./MapView";
import ntpcLogo from "./assets/logo.png";

function App() {
  const [destination, setDestination] = useState(null);

  const locations = [
    {
      id: "admin1",
      name: "Samanvay",
      icon: "🏢",
    }, 
    {
      id: "admin2",
      name: "Saavyas",
      icon: "🏢",
    },
    {
      id: "Documentation",
      name: "Documentation",
      icon: "🏢",
    },
    {
      id: "it",
      name: "IT & Communications",
      icon: "💻",
    },
    {
      id: "parking1",
      name: "Parking 1",
      icon: "🅿️",
    },
    {
      id: "parking2",
      name: "Parking 2",
      icon: "🅿️",
    },
  ];

  if (destination) {
    return (
      <MapView
        destination={destination}
        onBack={() => setDestination(null)}
      />
    );
  }

  return (
    <div className="app">
      <div className="container">
        <img
  src={ntpcLogo}
  alt="NTPC Logo"
  className="ntpc-logo"
/>
        <h1>NTPC Navigation</h1>

        <div className="tiles">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="tile"
              onClick={() => setDestination(loc.id)}
            >
              <div className="icon">{loc.icon}</div>
              <h3>{loc.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
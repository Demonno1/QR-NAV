import { useState } from "react";
import "./App.css";
import MapView from "./mapview";
import ntpcLogo from "./assets/logo.png";
import {
  FaBuilding,
  FaCar,
  FaFileAlt,
  FaLaptopCode
} from "react-icons/fa";

function App() {
  const [destination, setDestination] = useState(null);
  const [theme, setTheme] = useState("dark");
  const locations = [
    {
      id: "admin1",
      name: "Samanvay",
      icon: <FaBuilding />,
    }, 
    {
      id: "admin2",
      name: "Saavyas",
      icon: <FaBuilding />,
    },
    {
      id: "Documentation",
      name: "Documentation",
      icon: <FaFileAlt />,
    },
    {
      id: "it",
      name: "IT & Comm.",
      icon: <FaLaptopCode />,
    },
    {
      id: "parking1",
      name: "Parking 1",
      icon: <FaCar />,
    },
    {
      id: "parking2",
      name: "Parking 2",
      icon: <FaCar />,
    },
  ];

  if (destination) {
    return (
      <MapView
    destination={destination}
    onBack={() => setDestination(null)}
    theme={theme}
    setTheme={setTheme}
/>
    );
  }

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <button
          className="theme-toggle"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
        >
  {theme === "dark" ? "☀️" : "🌙"}
</button>
        <div className="logo-container">
          <img
            src={ntpcLogo}
            alt="NTPC Logo"
            className="ntpc-logo"
          />
        </div>
        <h1 className="navigation-title">
          NTPC Simhadri Navigation
           
        </h1>
        <h1 className="navigation-title">Administration Block</h1>

        <div className="tiles">
          {locations.map((loc, index) => (
            <div
              key={loc.id}
              className="tile"
              onClick={() => setDestination(loc.id)}
              style={{ animationDelay: `${0.2 + index * 0.1}s`, opacity: 0, animation: `fadeUp 0.6s ease-out forwards ${0.2 + index * 0.1}s` }}
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
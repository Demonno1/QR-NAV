import { areas } from "./data";
import { useState, useEffect } from "react";
import "./App.css";
import MapView from "./components/mapview";
import ntpcLogo from "./assets/logo.png";
import {
  FaBuilding,
  FaCar,
  FaFileAlt,
  FaLaptopCode,
  FaIndustry,
  FaBolt,
  FaSolarPanel,
  FaDoorOpen,
  FaTruckMoving,
  FaSchool,
  FaHospital,
  FaTree,
  FaHotel,
  FaUsers,
  FaHome,
  FaSearch,
  FaMicrophone,
  FaTimes,
  FaHardHat
} from "react-icons/fa";



function App() {
  const [isListening, setIsListening] = useState(false);
  const [destination, setDestination] = useState(null);
  const [selectedArea, setSelectedArea] = useState("administration");
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("dark");
  const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser doesn't support Voice Search.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onstart = () => 
  {
    recognition.onspeechstart = () => {};
    setIsListening(true);
  };
  recognition.lang = "en-IN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  setIsListening(true);
  recognition.start();
  recognition.onresult = (event) => 
  {
    const transcript =
    event.results[event.results.length - 1][0].transcript;
    setSearchTerm(transcript);
    recognition.stop();
  };

  recognition.onerror = (event) => 
  {
  console.log("Speech Error:", event.error);
  console.log(event);
  setIsListening(false);
  };
  recognition.onend = () => 
  {
    setIsListening(false);
  };
};
useEffect(() => 
{
  const handleBack = () => 
  {
  setDestination(null);
  };

  window.addEventListener("popstate", handleBack);

  return () => 
  {
    window.removeEventListener("popstate", handleBack);
  };
}, []);
  const locations = 
  {

    administration:[
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
    ],

   powerPlant: [
  {
    id: "unit1",
    name: "Unit 1",
    icon: <FaIndustry />,
    departments: []
  },
  {
    id: "unit2",
    name: "Unit 2",
    icon: <FaIndustry />,
    departments: []
  },
  {
    id: "unit3",
    name: "Unit 3",
    icon: <FaIndustry />,
    departments: []
  },
  {
    id: "unit4",
    name: "Unit 4",
    icon: <FaIndustry />,
    departments: []
  },
  {
    id: "switchyard",
    name: "Switch Yard",
    icon: <FaBolt />,
    departments: []
  },
  {
    id: "sankalp1",
    name: "Sankalp 1",
    icon: <FaBuilding />,
    departments: []
  },
  {
    id: "sankalp2",
    name: "Sankalp 2",
    icon: <FaBuilding />,
    departments: []
  },
  {
    id: "chp",
    name: "CHP",
    icon: <FaTruckMoving />,
    departments: []
  },
  {
    id: "solar",
    name: "Solar Plant",
    icon: <FaSolarPanel />,
    departments: []
  },
  {
    id: "safetypark",
    name: "Safety Park",
    icon: <FaHardHat />,
    departments: []
  },
  {
    id: "ich",
    name: "Indian Coffee House",
    icon: <FaUsers />,
    departments: ["Canteen"]
  }
],

    township: [
  {
    id: "school",
    name: "School",
    icon: <FaSchool />,
    departments: []
  },
  {
    id: "hospital",
    name: "Hospital",
    icon: <FaHospital />,
    departments: []
  },
  {
    id: "sarovarpark",
    name: "Sarovar Park",
    icon: <FaTree />,
    departments: []
  },
  {
    id: "saradaguesthouse",
    name: "Sarada Guest House",
    icon: <FaHotel />,
    departments: []
  },
  {
    id: "sanjeevaniguesthouse",
    name: "Sanjeevani Guest House",
    icon: <FaHotel />,
    departments: []
  },
  {
    id: "sagarikaguesthouse",
    name: "Sagarika Guest House",
    icon: <FaHotel />,
    departments: []
  },
  {
    id: "rli",
    name: "RLI",
    icon: <FaBuilding />,
    departments: []
  },
  {
    id: "tarangamclub",
    name: "Tarangam Club",
    icon: <FaUsers />,
    departments: []
  }
],

};
  const currentAreaData = areas[selectedArea];

  const filteredLocations = locations[selectedArea].filter((loc) => {
  // Search building name
  const buildingMatch = loc.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  // Search departments inside the building
  const departmentMatch =
  currentAreaData.departments[loc.id]?.some((dept) =>
    dept.toLowerCase().includes(searchTerm.toLowerCase())
  ) || false;

  return buildingMatch || departmentMatch;
});
  if (destination) {
  return (
    <MapView
      area={selectedArea}
      destination={destination}
      onBack={() => window.history.back()}
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
  
  {/* Search Bar */}
<div className="search-container">
  <div className="search-wrapper">

    <FaSearch className="search-icon" />

    <input
      type="text"
      className="search-box"
      placeholder={
        isListening
          ? "Listening..."
          : "Search"
      }
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    {searchTerm && (
  <button
    className="clear-btn"
    onClick={() => setSearchTerm("")}
    title="Clear search"
  >
    <FaTimes />
  </button>
)}

<button
  className={`mic-btn ${isListening ? "listening" : ""}`}
  onClick={startListening}
  title="Voice Search"
>
  <FaMicrophone />
</button>

  </div>
</div>

{/* Area Buttons */}
<div className="area-selector">

    <button
  className={`plant-btn ${selectedArea === "powerPlant" ? "active-area" : ""}`}
  onClick={() => setSelectedArea("powerPlant")}
>
  <FaIndustry className="area-icon" />
  <span>Power Plant</span>
</button>

</div>

<div className="area-selector second-row">

    <button
      className={` ${selectedArea === "administration" ? "active-area" : ""}`}
      onClick={() => setSelectedArea("administration")}
    >
      <FaBuilding className="area-icon" />
      Administration
    </button>

    <button
  className={selectedArea === "township" ? "active-area" : ""}
  onClick={() => setSelectedArea("township")}
>
  <FaHome className="area-icon" />
  <span>Township</span>
</button>

</div>

        <div className="tiles">
        {filteredLocations.map((loc, index) => (
            <div
              key={loc.id}
              className="tile"
              onClick={() => {
                window.history.pushState({}, "");
                setDestination(loc.id);
          }}
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
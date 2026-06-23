import mapImage from "./assets/admin-campus.jpg";

function MapView({ onBack }) {

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();

    const x = Math.round(
      ((e.clientX - rect.left) / rect.width) * 1400
    );

    const y = Math.round(
      ((e.clientY - rect.top) / rect.height) * 1000
    );

    console.log(`${x},${y}`);

    alert(
      `X = ${x}\nY = ${y}`
    );
  };

  return (
    <div className="map-page">

      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2>
        Click on any point to get coordinates
      </h2>

      <div className="map-wrapper">

        <img
          src={mapImage}
          alt="Campus Map"
          className="map-image"
          onClick={handleClick}
        />

      </div>

    </div>
  );
}

export default MapView;
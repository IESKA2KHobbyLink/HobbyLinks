import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

function MapSection({ lat, lng }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(12);

  console.log("lng", lng, "lat", lat);
  useEffect(() => {
    if (lat !== null && lng !== null) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      const markerColor = "orange";
      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([lng, lat])
        .addTo(map.current);

      // Clean up the map and marker when the component unmounts or when the coordinates change to null
      return () => {
        marker.remove();
        map.current.remove();
      };
    }
  }, [lat, lng, zoom]);

  if (lat === null || lng === null) {
    return <Nullmap />;
  }
  return (
    <div className="mx-auto mt-5 max-w-4xl w-full">
      <div className="mt-5 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Map</h1>

        <div id="map" className="w-[896px] h-80 mb-6 mt-4">
          <div ref={mapContainer} className="h-full" />
        </div>
      </div>
    </div>
  );
}

function Nullmap() {
  return (
    <div className="mx-auto mt-5 max-w-4xl w-full">
      <h1 className="text-3xl font-bold mb-2">Map</h1>
      <div className="flex gap-1 justify-center items-center bg-slate-100 max-w-4xl w-full h-52 mt-2 border-slate-200 rounded-md">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faImage} size="2xl" />
          <p className="font-thin">No map display</p>
        </div>
      </div>
    </div>
  );
}

export default MapSection;

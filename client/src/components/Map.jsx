import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_API;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // Get user's current lng lat
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;

          setLng(longitude);
          setLat(latitude);
        },
        (error) => {
          console.log("Error retrieving location:", error.message);
        }
      );
    }
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (lng !== null && lat !== null && map.current === null) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }
  }, [lng, lat]); // Runs when lng or lat change

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        console.log("mapResponse", response.data);
        response.data.map((e) => {
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            e.event_name
          );
          const marker = new mapboxgl.Marker()
            .setLngLat([e.lng, e.lat])
            .setPopup(popup)
            .addTo(map.current);
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEventsData();
  }, []);

  return (
    <div id="map" className="w-96 h-80 mb-6 mt-4">
      <div ref={mapContainer} className="h-full" />
    </div>
  );
}

export default Map;

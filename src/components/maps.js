import { useEffect, useRef, useState } from "react";

const GoogleMapPicker = ({ initialLat, initialLng,onChangeLocation }) => {
   const [coords,setCoords] = useState({
  lat: !isNaN(Number(initialLat)) ? Number(initialLat) : 12.9716,
  lng: !isNaN(Number(initialLng)) ? Number(initialLng) : 77.5946,
});

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
     const updateCoords = (newCoords) => {
      setCoords(newCoords);
      if (onChangeLocation) {
        onChangeLocation(newCoords); // send coords to parent
      }
    };
    const initMap = () => {
      const defaultLocation = {
        lat: coords.lat,
        lng: coords.lng,
      };

      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 13,
      });

      const input = document.getElementById("pac-input");
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      const marker = new window.google.maps.Marker({
        position: defaultLocation,
        map,
        draggable: true,
      });

      markerRef.current = marker;

      // Handle manual map click
      map.addListener("click", (e) => {
        const clickedLocation = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        marker.setPosition(clickedLocation);
         updateCoords(clickedLocation);
      });

      // Handle autocomplete place selection
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        map.panTo(place.geometry.location);
        map.setZoom(15);
        marker.setPosition(place.geometry.location);
         updateCoords(newLocation);
      });

      // Handle marker drag
      marker.addListener("dragend", () => {
        const position = marker.getPosition();
        const newCoords = {
          lat: position.lat(),
          lng: position.lng(),
        };
         updateCoords(newCoords);
      });
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          initMap();
          clearInterval(interval);
        }
      }, 300);
    }
  }, [initialLat, initialLng]);

  return (
    <div className="seller-col-lg-4">
      <div className="seller-form-group focused">
        <label className="seller-form-control-label h5">
          Business Location
        </label>
        <input
          id="pac-input"
          className="seller-form-control seller-form-control-alternative mb-2"
          type="text"
          placeholder="Search for location"
        />
        <div
          id="map"
          ref={mapRef}
          style={{ width: "100%", height: "300px", borderRadius: "12px" }}
        />
        <input
          type="text"
          className="seller-form-control seller-form-control-alternative mt-2"
          placeholder="Latitude"
          value={coords.lat || ""}
          readOnly
        />
        <input
          type="text"
          className="seller-form-control seller-form-control-alternative mt-2"
          placeholder="Longitude"
          value={coords.lng || ""}
          readOnly
        />
      </div>
    </div>
  );
};

export default GoogleMapPicker;

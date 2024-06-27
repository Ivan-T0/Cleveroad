import React, { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Map.module.css";

export const Map = ({ center }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBuua0b_A0w6E4XFZEn2_TTEztmmXV5tcs",
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (
      !isNaN(center.lat) &&
      !isNaN(center.lng) &&
      center.lat !== 0 &&
      center.lng !== 0
    ) {
      mapRef.current?.panTo(center);
    }
  }, [center]);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  return (
    <div className={styles.mapContainer}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={center}
          zoom={7}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      ) : (
        <h2>Loading...</h2>
      )}
      {isLoaded && mapRef.current && (
        <Marker
          position={center}
          map={mapRef.current}
          onLoad={(marker) => (markerRef.current = marker)}
        />
      )}
    </div>
  );
};

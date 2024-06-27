import { getLocated } from "../API/getLocated";
import { useEffect, useState } from "react";
import { Map } from "../Map/Map";
import styles from "./Located.module.css";
import { ListAstros } from "../List/ListAstros";
export const Located = () => {
  const [position, setPosition] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const fetchLocatedData = () => {
    getLocated()
      .then((data) => {
        setPosition(data.iss_position);
        setTimestamp(data.timestamp);
        setError("");
      })
      .catch((e) => {
        setError("Failed to fetch ISS position...");
      });
  };

  useEffect(() => {
    fetchLocatedData();
    const intervalId = setInterval(fetchLocatedData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString();
  };

  const center = {
    lat: Number(position.latitude),
    lng: Number(position.longitude),
  };

  return (
    <div className={styles.located}>
      <div className={styles.coordinates}>
        <h2>ISS is now located at:</h2>
        {error ? (
          <p className={styles.text}>Error: {error}</p>
        ) : (
          <p className={styles.text}>
            longitude: {position.longitude}, latitude: {position.latitude}
          </p>
        )}
      </div>
      <div className={styles.date}>
        <p className={styles.text}>Current date: {formatDate(timestamp)}</p>
      </div>
      <div className={styles.map}>
        <Map center={center} />
      </div>
      <div className={styles.listAstros}>
        <ListAstros />
      </div>
    </div>
  );
};

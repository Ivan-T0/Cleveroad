import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { getAstros } from "../API/getLocated";
import styles from "./List.module.css";

export const ListAstros = () => {
  const [astros, setAstros] = useState([]);
  const [error, setError] = useState("");

  const fetchAstrosData = () => {
    getAstros()
      .then((data) => {
        const issAstros = data.people.filter((astr) => astr.craft === "ISS");
        setAstros(issAstros);
        setError("");
      })
      .catch((e) => {
        setError("Failed to fetch astronauts data. Please try again later.");
      });
  };

  useEffect(() => {
    fetchAstrosData();
  }, []);

  const totalAstros = astros.length;

  return (
    <div>
      {error ? (
        <p className={styles.text}>Error: {error}</p>
      ) : (
        <div className={styles.astros}>
          <ul className={styles.list}>
            {astros.map((astro, index) => (
              <li className={styles.list_item} key={index}>
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  className={styles.icon_row}
                />
                {astro.name}
              </li>
            ))}
          </ul>
          <p className={styles.text}>
            Total amount: {totalAstros} people on ISS
          </p>
        </div>
      )}
    </div>
  );
};

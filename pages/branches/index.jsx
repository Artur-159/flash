import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { StationsAPI } from "../../services/stations";

import styles from "./styles.module.scss";

const Branches = () => {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const dispatch = useDispatch();
  const [activeProductId, setActiveProductId] = useState("all");

  const { stations } = useSelector((state) => state.stations);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(StationsAPI.getAll()).unwrap();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  const getIconForStation = (station) => {
    if (
      activeProductId !== "all" &&
      !station.products?.includes(activeProductId)
    ) {
      return "/icons/emptyStationsMap.svg";
    }
    return "/icons/stationsMap.svg";
  };

  return (
    <div className={styles.container}>
      <YMaps>
        <Map
          defaultState={{ center: [40.1792, 44.4991], zoom: 9 }}
          width="100%"
          height="600px"
        >
          <div className={styles.filtersOverlay}>
            <button
              className={`${styles.button} ${
                activeProductId === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveProductId("all")}
            >
              Բոլորը
            </button>
            {products.map((product) => (
              <button
                key={product.id}
                className={`${styles.button} ${
                  activeProductId === product.id ? styles.active : ""
                }`}
                onClick={() => setActiveProductId(product.id)}
              >
                {product.name}
              </button>
            ))}
          </div>

          {stations?.map((station) => (
            <Placemark
              key={station.id}
              geometry={[station?.latitude, station?.longitude]}
              properties={{
                iconCaption: station?.address,
                hintContent: station?.address,
              }}
              options={{
                iconLayout: "default#image",
                iconImageHref: getIconForStation(station),
                iconImageSize: [30, 42],
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default Branches;

import ProductNames from "../../../../components/product-names";
import Header from "../header";
import DropIcon from "@mui/icons-material/Opacity";
import NoData from "../../../../components/table/no-data";
import { getProductInfo } from "../../../../utils/get-product-Info";

import styles from "../../styles.module.scss";

const Vehicles = ({ vehicles }) => {
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  return (
    <article>
      <Header title="Իմ ՏՄ-ները" href="/vehicles" />
      {vehicles?.length > 0 ? (
        vehicles.map((vehicle) => {
          const productId = vehicle.products[0]; // Այստեղ վերցնում ենք
          const { color } = getProductInfo(productId); // Այստեղ օգտագործում

          return (
            <div key={vehicle.id} className={styles.bottom_row_data}>
              <div className={styles.vehicle_info}>
                <img src="/icons/car_one.svg" alt="car" />
                <div className={styles.model_block}>
                  <p>{vehicle.license_number}</p>
                  <p>{vehicle.model}</p>
                </div>
              </div>
              <div className={styles.right_block}>
                <DropIcon style={{ color }} />
                <ProductNames id={productId} products={products} />
              </div>
            </div>
          );
        })
      ) : (
        <NoData
          imageSrc="/images/my-cars.svg"
          title="Դուք չունեք կցված ՏՄ-ներ"
          description="Ծառայություններից օգտվելու համար անհրաժեշտ է ավելացնել ՏՄ"
        />
      )}
    </article>
  );
};

export default Vehicles;

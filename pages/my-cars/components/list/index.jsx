import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyCarsAPI } from "../../../../services/my-cars.js";
import params from "../../../../helpers/params.js";
import TableHeader from "../../../../components/table/table-header";
import NoData from "../../../../components/table/no-data";
import TableBody from "../table-body/index.jsx";
import Pagination from "../../../../components/pagination"

import styles from "./styles.module.scss";

const List = () => {
  const dispatch = useDispatch();
  const { cars, total } = useSelector((state) => state.cars);
  const { offset } = useSelector((state) => state.pagination);
  useEffect(() => {
    dispatch(MyCarsAPI.getAll(params(10, offset)));
  }, [dispatch]);

  return (
    <div>
      <div className={styles.transaction}>
        <TableHeader
          columns={["Պետհամարանիշ", "Մակնիշ", "Վառելիք", "Գործողություններ"]}
        />
        {cars.length > 0 ? (
          <TableBody data={cars} />
        ) : (
          <NoData
            imageSrc="/images/my-cars.svg"
            title="Դուք չունեք կցված ՏՄ-ներ"
            description="Ծառայություններից օգտվելու համար անհրաժեշտ է ավելացնել ՏՄ"
          />
        )}
      </div>
      {total > 9 ? (
        <Pagination total={total} offset={offset} pageCount={10} />
      ) : null}
    </div>
  );
};

export default List;

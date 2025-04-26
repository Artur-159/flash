import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../../store/transaction/slice";
import { getStatusFilters } from "../../../../utils/get-status-filters";
import FilterTab from "../filter-tab";
import MainButton from "../../../../components/button";

import styles from "./styles.module.scss";

const Filter = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { statusInfo, filter } = useSelector((state) => state.transaction);

  const selectedIds = filter.transaction_statuses || [];

  const allIds = statusInfo.map((s) => s.id);
  const isAllSelected =
    selectedIds.length === 0 || selectedIds.length === allIds.length;

  const handleToggle = (id) => {
    const updatedStatuses = getStatusFilters({
      id,
      selectedIds,
      allIds,
    });
    dispatch(setFilter({ ...filter, transaction_statuses: updatedStatuses }));
  };

  const filters = [{ id: "all", name: "Բոլորը" }, ...statusInfo];

  return (
    <div className={styles.wrapper}>
      <p>Գործարքներ</p>
      <div className={styles.top_block}>
        <div className={styles.checkbox_group}>
          {filters.map(({ id, name }) => {
            const isActive =
              id === "all" ? isAllSelected : selectedIds.includes(id);

            return (
              <div
                key={id}
                className={`${styles.tab} ${isActive ? styles.active : ""}`}
                onClick={() => handleToggle(id)}
              >
                {name}
              </div>
            );
          })}
        </div>
        <div className={styles.btn_block}>
          <MainButton
            className={styles.filter_button}
            onClick={() => setOpen(true)}
          >
            <img src="/icons/filter_icon.svg" alt="filter icon" />
            Ֆիլտեր
          </MainButton>
        </div>
      </div>

      {open && <FilterTab onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Filter;

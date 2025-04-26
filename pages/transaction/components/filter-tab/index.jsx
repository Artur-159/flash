import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setFilter } from "../../../../store/transaction/slice";
import { handleError } from "../../../../utils/handle-error";
import { StationsAPI } from "../../../../services/stations";
import { TYPES, FILTER_INFO_INPUT } from "../../../../constant/transaction";
import MainButton from "../../../../components/button";
import TextInput from "../../../../components/text-input";
import MainSelect from "../../../../components/main-select";

import styles from "./styles.module.scss";

const FilterTab = ({ onClose }) => {
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.transaction);
  const { optionsStations } = useSelector((state) => state.stations);

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      user_id: "",
      partner_id: "",
      created_at_start: "",
      created_at_end: "",
      products: "",
      transaction_types: filter.transaction_types || [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(setFilter({ ...filter, ...data }));
    onClose();
  });

  const handleReset = () => {
    dispatch(setFilter({}));
    reset({
      user_id: "",
      partner_id: "",
      created_at_start: "",
      created_at_end: "",
      products: "",
      station_id: "",
      transaction_types: [],
    });
  };

  useEffect(() => {
    reset(filter);
  }, [filter, reset]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(StationsAPI.getAll()).unwrap();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <MainButton className={styles.close} variant="close" onClick={onClose}>
          <img src="/icons/close.svg" alt="close" />
        </MainButton>
        <h3 className={styles.title}>Ֆիլտրեր</h3>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field_group}>
            {FILTER_INFO_INPUT.slice(0, 2).map((field) => (
              <TextInput
                key={field.name}
                name={field.name}
                label={field.placeholder}
                control={control}
                {...field}
              />
            ))}
          </div>

          <MainSelect
            control={control}
            name="products"
            placeholder="Վառելիքի տեսակ"
            options={products.map((p) => ({ value: p.id, label: p.name }))}
          />

          <MainSelect
            control={control}
            name="station_id"
            placeholder="Կայան"
            options={optionsStations}
          />
          <div className={styles.checkbox_group}>
            <p>Գործարքի տեսակ *</p>
            {TYPES.map(({ id, label }) => {
              const selected = watch("transaction_types");
              const isChecked = selected?.includes(id);

              const handleChange = () => {
                const updated = isChecked
                  ? selected.filter((v) => v !== id)
                  : [...selected, id];

                setValue("transaction_types", updated);
              };

              return (
                <label
                  key={id}
                  className={`${styles.checkbox_item} ${
                    isChecked ? styles.active : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                  />
                  {label}
                </label>
              );
            })}
          </div>
          <div className={styles.date_group}>
            {FILTER_INFO_INPUT.slice(2).map((field) => (
              <TextInput
                key={field.name}
                name={field.name}
                label={field.placeholder}
                control={control}
                {...field}
              />
            ))}
          </div>
          <div className={styles.btn_boxes}>
            <MainButton
              type="button"
              onClick={handleReset}
              className={styles.clear}
            >
              Ջնջել
            </MainButton>
            <MainButton type="submit" className={styles.apply}>
              Ֆիլտրել
            </MainButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterTab;

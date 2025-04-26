import { useDispatch } from "react-redux";
import { setModalOpen } from "../../../../store/modal/slice";
import { MyCarsAPI } from "../../../../services/my-cars";
import { clearOneCar } from "../../../../store/my-cars/slice";
import BasicModal from "../../../../components/modals/basic-modal";
import MainButton from "../../../../components/button";
import ProductNames from "../../../../components/product-names";
import Edit from "../edit";
import params from "../../../../helpers/params";
import { handleError } from "../../../../utils/handle-error";

import styles from "./styles.module.scss";

const TableBody = ({ data = [] }) => {
  const dispatch = useDispatch();
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  const handleDelete = async (id) => {
    try {
      await dispatch(MyCarsAPI.remove(id)).unwrap();
      await dispatch(MyCarsAPI.getAll(params())).unwrap();
      dispatch(setModalOpen(false));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.table_body}>
      {data.map((car) => (
        <div className={styles.row} key={car.id}>
          <div className={styles.cell}>
            <img src="/icons/car_one.svg" alt="car" />
            {car.license_number}
          </div>

          <div className={styles.cell}>{car.model}</div>

          <div className={styles.cell}>
            <ProductNames id={car.products[0]} products={products} />
          </div>

          <div className={styles.cell}>
            <BasicModal
              title="Խմբագրել"
              variant="tableAction"
              startIcon="/icons/edit.svg"
              modalId={`edit-${car.id}`}
            >
              <Edit
                id={car.id}
                onClose={() => {
                  dispatch(setModalOpen(false));
                  dispatch(clearOneCar());
                }}
              />
            </BasicModal>

            <BasicModal
              title="Հեռացնել մեքենան"
              variant="tableAction"
              startIcon="/icons/remove.svg"
              modalId={`delete-${car.id}`}
              className={styles.asd}
              modalStyle={{ width: 540 }}
            >
              <div className={styles.delete_modal_content}>
                <h2>Դուք պատրաստվում եք հեռացնել Ձեր ՏՄ-ը </h2>
                <p>Հեռացնելուց հետո այն հնարավոր չէ վերականգնել</p>
                <div className={styles.delete_modal_buttons}>
                  <MainButton
                    onClick={() =>
                      dispatch(
                        setModalOpen({
                          modalId: `delete-${car.id}`,
                          isOpen: false,
                        })
                      )
                    }
                    className={styles.cancel_btn}
                  >
                    Չեղարկել
                  </MainButton>
                  <MainButton
                    onClick={() => handleDelete(car.id)}
                    className={styles.confirm_btn}
                  >
                    Հեռացնել
                  </MainButton>
                </div>
              </div>
            </BasicModal>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableBody;

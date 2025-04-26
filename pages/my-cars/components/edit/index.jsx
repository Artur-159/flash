import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MyCarsAPI } from "../../../../services/my-cars";
import { setModalOpen } from "../../../../store/modal/slice";
import Toast from "../../../../helpers/status-text";
import params from "../../../../helpers/params";
import Form from "../form";

const Edit = ({ id }) => {
  const dispatch = useDispatch();
  const { oneCar } = useSelector((state) => state.cars);
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  useEffect(() => {
    if (id) {
      dispatch(MyCarsAPI.getOne(id)).catch((error) =>
        Toast.error(error.message)
      );
    }
  }, [dispatch, id]);

  const handleEdit = async (data) => {
    try {
      const payload = {
        id: oneCar.id,
        model: data.model,
        license_number: data.license_number,
        product_ids: [Number(data.product_id)],
      };
      await dispatch(MyCarsAPI.update(payload)).unwrap();
      Toast.success("Մեքենան թարմացված է");
      dispatch(setModalOpen({ modalId: `edit-${id}`, isOpen: false }));
      dispatch(MyCarsAPI.getAll(params()));
    } catch (error) {
      Toast.error(error.message);
    }
  };

  if (!oneCar) return null;

  return (
    <Form
      onSubmit={handleEdit}
      defaultValues={{
        model: oneCar.model || "",
        license_number: oneCar.license_number || "",
        product_id: oneCar.products?.[0] || null,
      }}
      products={products}
      buttonText="Թարմացնել"
    />
  );
};

export default Edit;

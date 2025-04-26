import { useDispatch } from "react-redux";
import { MyCarsAPI } from "../../../../services/my-cars";
import { setModalOpen } from "../../../../store/modal/slice";
import Toast from "../../../../helpers/status-text";
import params from "../../../../helpers/params";
import Form from "../form";

const Create = () => {
  const dispatch = useDispatch();
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  const handleCreate = async (data) => {
    try {
      const payload = {
        model: data.model,
        license_number: data.license_number,
        product_ids: [Number(data.product_id)],
      };
      await dispatch(MyCarsAPI.create(payload)).unwrap();
      Toast.success("Մեքենան ավելացվեց");
      dispatch(setModalOpen(false));
      dispatch(MyCarsAPI.getAll(params()));
    } catch (error) {
      Toast.error(error.message);
    }
  };

  return (
    <Form
      products={products}
      buttonText="Ավելացնել"
      onSubmit={handleCreate}
      defaultValues={{ model: "", license_number: "", product_id: null }}
    />
  );
};

export default Create;

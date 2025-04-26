import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import FuelIcon from "../fuel-icon";
import { BalanceAPI } from "../../../../services/balance";
import { handleError } from "../../../../utils/handle-error";
import BasicModal from "../../../../components/modals/basic-modal";
import TextInput from "../../../../components/text-input";
import MainButton from "../../../../components/button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../styles.module.scss";

const AddFuelModal = ({ label, unit, color, product_id }) => {
  const dispatch = useDispatch();

  const uuid = uuidv4();
  const order_number = btoa(uuid).slice(0, 32);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      quantity: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    data.order_number = order_number;
    data.product_id = product_id;

    try {
      await dispatch(BalanceAPI.postAddBalance(data)).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BasicModal
      isIconButton={true}
      title={
        <AddIcon
          sx={{
            background: "#F3F4F6",
            borderRadius: "50%",
            color: "#883C84",
            width: 28,
            height: 28,
          }}
        />
      }
      modalId={`my ${label} balance`}
    >
      <FuelIcon color={color} />
      <Typography fontWeight="bold" fontSize="20px" mb={3}>
        Լիցքավորել {label}
      </Typography>

      <TextInput
        name="quantity"
        size="small"
        type="number"
        error={errors?.quantity?.message}
        control={control}
        label={`Վառելիքի ծավալ (${unit})`}
      />

      <MainButton
        className={styles.add_fuel_btn}
        variant="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Պահպանել
      </MainButton>
    </BasicModal>
  );
};

export default AddFuelModal;

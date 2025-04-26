import { Controller, useForm } from "react-hook-form";
import BasicModal from "../../../../components/modals/basic-modal";
import TextInput from "../../../../components/text-input";
import MainSelect from "../../../../components/main-select";
import MainButton from "../../../../components/button";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import transferIcon from "../../../../assets/icons/transfer.svg";

import styles from "./styles.module.scss";

const ForwardFuel = ({ id }) => {
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ amount: "", card: "", product_id: "" });

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BasicModal
      title="Փոխանցել"
      variant="tableAction"
      startIcon={transferIcon}
      modalId={`transfer-friend-${id}`}
    >
      <h2 className={styles.modal_title}>Փոխանցել</h2>
      <div>
        <div className={styles.input_block}>
          <TextInput
            type="number"
            name="amount"
            required={true}
            control={control}
            size="small"
            label="Ծավալ (լիտր)"
            error={errors.amount?.message}
          />
          <MainSelect
            name="card"
            required={true}
            errors={errors}
            control={control}
            placeholder="Քարտ"
            options={[
              { value: "Card 1", label: "Regular" },
              { value: "Card 2", label: "Regular" },
            ]}
          />
        </div>

        <Controller
          name="product_id"
          control={control}
          rules={{ required: "Պարտադիր է" }}
          render={({ field }) => (
            <FormControl component="fieldset" error={!!errors.product_id}>
              <FormLabel component="legend">Հիմնական վառելիք *</FormLabel>

              <RadioGroup
                row
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                {products.map((product) => (
                  <FormControlLabel
                    key={product.id}
                    value={product.id}
                    control={
                      <Radio
                        sx={{
                          color: "#999",
                          "&.Mui-checked": {
                            color: "#883c84",
                          },
                        }}
                      />
                    }
                    label={product.name}
                  />
                ))}
              </RadioGroup>

              {errors.product_id && (
                <FormHelperText>{errors.product_id.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <MainButton
          sx={{ mt: 2 }}
          variant="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Փոխանցել
        </MainButton>
      </div>
    </BasicModal>
  );
};

export default ForwardFuel;

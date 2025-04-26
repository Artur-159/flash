import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

import MainButton from "../../../../components/button";
import TextInput from "../../../../components/text-input";

import styles from "./styles.module.scss";

const Form = ({ defaultValues, onSubmit, products, isEdit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <h1 className={styles.title}>Ավելացնել ՏՄ</h1>

      <div className={styles.input_fields_wrapper}>
        <TextInput
          type="text"
          required={true}
          control={control}
          label="Պետհամարանիշ"
          name="license_number"
          rules={{ required: "Պարտադիր է" }}
          error={errors.license_number?.message}
        />
        <TextInput
          name="model"
          type="text"
          label="Մակնիշ"
          required={true}
          control={control}
          error={errors.model?.message}
          rules={{ required: "Պարտադիր է" }}
        />
      </div>

      <div className={styles.product_type_section}>
        <Controller
          name="product_id"
          control={control}
          rules={{ required: "Պարտադիր է" }}
          render={({ field }) => (
            <FormControl
              component="fieldset"
              error={!!errors.product_id}
              className={styles.form_control}
            >
              <FormLabel component="legend" className={styles.section_label}>
                Հիմնական վառելիք *
              </FormLabel>

              <RadioGroup
                row
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className={styles.custom_radio}
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
      </div>

      <div className={styles.submit_button_wrapper}>
        <MainButton type="submit">
          {isEdit ? "Թարմացնել" : "Ավելացնել"}
        </MainButton>
      </div>
    </form>
  );
};

export default Form;

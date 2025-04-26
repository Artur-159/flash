import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MainButton from "../../../components/button";
import TextInput from "../../../components/text-input";
import validationSchema from "./validation";
import { FIELDS } from "../../../constant/reset-password";

import styles from "./styles.module.scss";

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      repeat_password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div>
      <h1 className={styles.title}>ՎԵՐԱԿԱՆԳՆԵԼ ԳԱՂՏՆԱԲԱՌԸ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {FIELDS.map((field, i) => (
          <TextInput
            key={i}
            size="small"
            required={true}
            type="password"
            control={control}
            name={field.name}
            label={field.placeholder}
            autoComplete="new-password"
            errors={errors[field.name]?.message}
          />
        ))}

        <MainButton type="submit" color="primary" className={styles.button}>
          Հաստատել
        </MainButton>
      </form>
    </div>
  );
};

export default ResetPassword;

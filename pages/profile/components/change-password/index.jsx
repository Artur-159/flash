import { Box, Stack, Typography } from "@mui/material";
import TextInput from "../../../../components/text-input";
import { useForm } from "react-hook-form";
import { ProfileAPI } from "../../../../services/profile";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button";
import { useDispatch } from "react-redux";
import { handleError } from "../../../../utils/handle-error";
import { CHANGE_PASSWORD_FIELDS } from "../../../../constant/profile";

import styles from "./styles.module.scss";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    old_password: "",
    new_password: "",
  });

  const oldPassword = watch("old_password");
  const newPassword = watch("new_password");

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(ProfileAPI.updatePassword(data)).unwrap();
      if (res?.message) {
        Toast.success(res.message);
        reset();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom className={styles.title}>
        Գաղտնաբառ
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={2}
        className={styles.inputs_box}
      >
        {CHANGE_PASSWORD_FIELDS.map((item, index) => (
          <TextInput
            key={index}
            name={item.name}
            type={item.type}
            control={control}
            label={item.placeholder}
            error={errors[item.name]?.message}
          />
        ))}
      </Stack>
      <Box display="flex" justifyContent="flex-end">
        <MainButton
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={!oldPassword || !newPassword}
        >
          Պահպանել
        </MainButton>
      </Box>
    </>
  );
};

export default ChangePassword;

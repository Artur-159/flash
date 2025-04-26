import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Divider } from "@mui/material";

import MainButton from "../../../../components/button";
import TextInput from "../../../../components/text-input";
import BasicModal from "../../../../components/modals/basic-modal";
import { ProfileAPI } from "../../../../services/profile";
import Toast from "../../../../helpers/status-text";
import { CHANGE_EMAIL_FIELDS } from "../../../../constant/profile";

import styles from "./styles.module.scss";

const Email = ({ email }) => {
  const dispatch = useDispatch();

  const { control: mainControl, reset } = useForm({
    defaultValues: {
      old_email: "",
    },
  });

  const {
    handleSubmit: handleModalSubmit,
    control: modalControl,
    reset: resetModal,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      old_password: "",
    },
  });

  const onSubmitModal = async (data) => {
    try {
      const res = await dispatch(ProfileAPI.updateEmail(data)).unwrap();
      if (res?.message) {
        Toast.success(res.message);
        reset({ old_email: data.email });
        resetModal();
      }
    } catch (error) {
      const errors = error?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          Toast.error(err.message);
        });
      } else if (typeof errors === "string") {
        Toast.error(errors);
      }
    }
  };

  useEffect(() => {
    reset({ old_email: email || "" });
  }, [email, reset]);

  return (
    <>
      <TextInput
        type="email"
        size="small"
        name="old_email"
        sx={{ mb: 2 }}
        disabled
        fullWidth
        label="Էլ. հասցե"
        control={mainControl}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />

      <Box display="flex" justifyContent="flex-end">
        <BasicModal
          color="secondary"
          variant="primary"
          title="Փոխել էլ. փոստը"
          modalId="change-email"
        >
          <form onSubmit={handleModalSubmit(onSubmitModal)}>
            <Box display="flex" flexDirection="column" gap={2} mb={2}>
              {CHANGE_EMAIL_FIELDS.map((field) => (
                <TextInput
                  required={true}
                  key={field.name}
                  type={field.type}
                  size={field.size}
                  name={field.name}
                  control={modalControl}
                  label={field.placeholder}
                  errors={errors[field.name]?.message}
                />
              ))}
            </Box>
            <MainButton type="submit" variant="primary">
              Փոխել էլ. փոստը
            </MainButton>
            <MainButton
              variant="text"
              className={styles.cancel_btn}
              data-closemodal="change-email"
            >
              Չեղարկել
            </MainButton>
          </form>
        </BasicModal>
      </Box>

      <Divider sx={{ my: 4 }} />
    </>
  );
};

export default Email;

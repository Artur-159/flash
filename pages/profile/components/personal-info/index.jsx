import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextInput from "../../../../components/text-input";
import MainButton from "../../../../components/button";
import { FIELDS } from "../../../../constant/profile";
import { handleError } from "../../../../utils/handle-error";
import { ProfileAPI } from "../../../../services/profile";
import Toast from "../../../../helpers/status-text";
import { setUserData } from "../../../../store/auth/slice";

const PersonalInfo = ({ userData }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    first_name: userData?.first_name,
    last_name: userData?.last_name,
  });

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(ProfileAPI.updateUserData(data)).unwrap();
      if (res?.message) {
        Toast.success(res.message);
        dispatch(
          setUserData({
            fullname: `${data.first_name} ${data.last_name}`,
          })
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    reset({
      first_name: userData?.first_name,
      last_name: userData?.last_name,
    });
  }, [userData]);

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom mb={4}>
        Անձնական տվյալներ
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={2}
        mb={2}
      >
        {FIELDS.map((item, index) => (
          <TextInput
            fullWidth
            key={index}
            size="small"
            type={item.type}
            name={item.name}
            control={control}
            label={item.placeholder}
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <MainButton variant="primary" onClick={handleSubmit(onSubmit)}>
          Պահպանել
        </MainButton>
      </Box>
    </div>
  );
};

export default PersonalInfo;

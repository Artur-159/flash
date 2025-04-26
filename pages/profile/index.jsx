import { useForm } from "react-hook-form";
import { useEffect } from "react";

import {
  Box,
  // Checkbox,
  // FormControlLabel,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProfileAPI } from "../../services/profile";
import Picture from "./components/picture";
import Email from "./components/email";
import ChangePassword from "./components/change-password";
import PersonalInfo from "./components/personal-info";
import Checkbox from "../../components/checkbox";

const Profile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.profile);

  const { control } = useForm({
    defaultValues: {
      newsletter: true,
    },
  });

  const profilePicture = userData?.profile_picture
    ? userData.profile_picture
    : null;

  useEffect(() => {
    dispatch(ProfileAPI.getUserData());
  }, [dispatch]);

  const handleNewsletterChange = async (e) => {
    // const checked = e.target.checked;
    // try {
    //   const res = await ProfileAPI.updateNewsletter({ newsletter: checked });
    //   if (res?.message) {
    //     Toast.success(res.message);
    //   }
    // } catch (error) {
    //   const errors = error?.errors;
    //   if (Array.isArray(errors)) {
    //     errors.forEach((err) => {
    //       Toast.error(err.message);
    //     });
    //   } else if (typeof errors === "string") {
    //     Toast.error(errors);
    //   }
    // }
  };

  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ maxWidth: 968, mx: "auto", p: 2 }}
      >
        Կարգավորումներ
      </Typography>
      <Box sx={{ maxWidth: 968, mx: "auto", p: 2, mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Picture profilePicture={profilePicture} />

          <Box sx={{ width: "100%" }}>
            <PersonalInfo userData={userData} />
            <Email email={userData?.email} />

            <ChangePassword />
            <Divider sx={{ my: 4 }} />
            <Checkbox
              name="newsletter"
              control={control}
              onChange={handleNewsletterChange}
              label="Ցանկանում եմ ստանալ ծանուցումներ"
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;

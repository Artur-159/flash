import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainButton from "../../../components/button";
import TextInput from "../../../components/text-input/";
import { AuthAPI } from "../../../services/auth";
import { handleError } from "../../../utils/handle-error";
import Toast from "../../../helpers/status-text";

import styles from "./styles.module.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
      with_code: "false",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await dispatch(AuthAPI.resetPassword(data)).unwrap();
      if (res?.message) {
        Toast.success(res.message);
        navigate("/login");
      }
    } catch (error) {
      handleError(error);
    }
  });
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Մոռացե՞լ եք գաղտնաբառը</h1>
      <p className={styles.description}>
        Գրեք Ձեր էլ փոստը և ստացեք կոդ գաղտնաբառը վերականգնելու համար
      </p>
      <form onSubmit={onSubmit}>
        <TextInput
          type="email"
          required={true}
          errors={errors}
          name="username"
          control={control}
          className={styles.form_input}
          label="Մուտքագրեք Ձեր էլ. փոստը"
        />

        <MainButton type="submit" color="primary" className={styles.button}>
          Ուղարկել վերականգնման հղում
        </MainButton>
      </form>
    </div>
  );
};

export default ForgotPassword;

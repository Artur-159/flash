import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { generateToken } from "../../../notifications/firebase";
import { AuthAPI } from "../../../services/auth";
import { handleError } from "../../../utils/handle-error";
import Toast from "../../../helpers/status-text";
import ShowConfirmCode from "../show-confirm-code";
import LOGIN_FIELDS from "../../../constant/login";
import TextInput from "../../../components/text-input";
import MainButton from "../../../components/button";

import styles from "./styles.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    confirmEmail: false,
  });

  const openConfirmCode = (email) =>
    setModal((prev) => ({ ...prev, confirmEmail: true, email }));

  const closeConfirmCode = () =>
    setModal((prev) => ({ ...prev, confirmEmail: false }));

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      debug: true,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await dispatch(AuthAPI.login(data)).unwrap();
      Toast.success(res.message);
      openConfirmCode(data.username);
      await generateToken();
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <div className={styles.container}>
      {modal.confirmEmail && (
        <ShowConfirmCode
          isExpired={false}
          email={modal.email}
          onClose={closeConfirmCode}
        />
      )}
      <div className={styles.login}>
        <h1 className={styles.login_title}>Մուտք</h1>

        <div className={styles.login_form}>
          {LOGIN_FIELDS.map((input) => (
            <TextInput
              size="small"
              key={input.name}
              type={input.type}
              name={input.name}
              control={control}
              required={input.required}
              label={input.placeholder}
              className={styles.login_input}
              errors={errors[input.name]?.message}
            />
          ))}
        </div>
        <div className={styles.forgot_password}>
          <Link to="forgot-password" className={styles.link}>
            Մոռացել եք գաղտնաբառը
          </Link>
        </div>

        <div className={styles.btn_log_reg}>
          <MainButton
            type="submit"
            size="large"
            color="secondary"
            variant="primary"
            onClick={onSubmit}
            className={styles.btn}
          >
            Մուտք
          </MainButton>
          <div className={styles.register_block}>
            Չունե՞ք հաշիվ{" "}
            <Link to="register" className={styles.link}>
              Գրանցում
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

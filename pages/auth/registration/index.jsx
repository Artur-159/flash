import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../../components/button";
import { AuthAPI } from "../../../services/auth";
import TextInput from "../../../components/text-input/";
import Toast from "../../../helpers/status-text";
import FIELDS from "../../../constant/registration";
import { Checkbox } from "@mui/material";
import SuccessModal from "../../../components/modals/success-modal";
import formatPhoneNumber from "../../../helpers/format-phone-number";
import { handleError } from "../../../utils/handle-error";

import styles from "./styles.module.scss";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "+374",
      password: "",
      password_confirmation: "",
      type: "individual",
      termsAndConditions: false,
    },
  });

  const termsChecked = watch("termsAndConditions");

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await dispatch(AuthAPI.register(data)).unwrap();
      if (res.email && res.message) {
        Toast.success("Successfully registered Please confirm your email :)");
        handleOpen();
      }
    } catch (error) {
      handleError(error);
    }
  });

  const handleReSendEmail = async () => {
    try {
      const email = getValues("email");
      const res = await dispatch(AuthAPI.resendEmail({ email })).unwrap();
      if (res?.message) {
        Toast.success("Successfully resend email Please confirm your email :)");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.reg}>
      <h1 className={styles.reg_title}>Գրանցում</h1>
      <SuccessModal
        isOpen={open}
        onClose={handleClose}
        disableBackdropClick={true}
        title="Գրանցումը հաջողությամբ կատարվել է"
      >
        <p className={styles.info_text}>
          Շնորհակալություն: Flash-ում գրանցվելու համար: Գրանցման գործընթացը
          ավարտելու և մեր գործառույթներից լիարժեք օգտվելու համար խնդրում ենք
          հաստատել ձեր էլ փոստը
        </p>{" "}
        <p className={styles.info_text}>
          Հաստատման հղումն հաղարկվել է գրանցման ժամանակ ձեր տրամադրած էլ.փոստի
        </p>
        <p className={styles.info_text}>
          {" "}
          Խնդրում ենք սեղել էլ. փոստի հղման վրա՝ ձեր հաշիվը հաստատելու համար
        </p>
        <p className={styles.info_text}>
          Եթե նամակը չեք ստացել, խնդրում ենք ստուգել ձեր սպամը
        </p>
        <p className={styles.info_text}>
          Շնորհակաության Flash և ընտրելու համար
        </p>
        <MainButton
          variant="primary"
          className={styles.modal_reg_btn}
          onClick={() => navigate("/login")}
        >
          Մուտք
        </MainButton>
        <MainButton
          variant="primary"
          onClick={handleReSendEmail}
          className={styles.resend_btn}
        >
          Նորից ուղարկել էլ. նամակը
        </MainButton>
      </SuccessModal>
      <form onSubmit={onSubmit} className={styles.reg_form}>
        {FIELDS.map((field) => (
          <TextInput
            required={true}
            size={field.size}
            control={control}
            key={field.name}
            type={field.type}
            name={field.name}
            label={field.placeholder}
            className={styles.reg_input}
            error={errors[field.name]?.message}
            onInput={
              field.name === "phone" ? (e) => formatPhoneNumber(e) : undefined
            }
          />
        ))}
      </form>
      <div className={styles.checkbox_block}>
        <Checkbox
          color="secondary"
          id="termsAndConditions"
          {...register("termsAndConditions")}
          className={styles.reg_checkbox}
        />
        <label htmlFor="termsAndConditions">
          Օգտագործելով մեր ծառայությունները, դուք համաձայնվում եք մեր{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://flashpetrol.am/docs/terms_and_conditions_en.html"
            className={styles.link}
          >
            Օգտագործման պայմաններին
          </a>
        </label>
      </div>
      <div>
        <MainButton
          type="submit"
          onClick={onSubmit}
          variant="primary"
          disabled={!termsChecked}
          className={styles.reg_btn}
        >
          Գրանցվել
        </MainButton>
        <div className={styles.link_block}>
          <span>Ունե՞ք հաշիվ</span>{" "}
          <Link to="/auth" className={styles.link}>
            Մուտք
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;

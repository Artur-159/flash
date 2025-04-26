import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toast from "../../../helpers/status-text";
import { AuthAPI } from "../../../services/auth";
import MainButton from "../../../components/button";
import CloseIcon from "@mui/icons-material/Close";
import { handleError } from "../../../utils/handle-error";
import { ProductsAPI } from "../../../services/products";

import styles from "./styles.module.scss";

const ShowConfirmCode = ({ email, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [countdown, setCountdown] = useState(30);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (isTimerActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
  }, [countdown, isTimerActive]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleConfirm = async () => {
    try {
      const code = otp.join("");
      const response = await dispatch(
        AuthAPI.verifyTwoFactorAuthCode({ email, code })
      ).unwrap();

      if (response && response.access_token && response.refresh_token) {
        await dispatch(ProductsAPI.getAll()).unwrap();
        navigate("/dashboard");
        onClose();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await dispatch(
        AuthAPI.resendTwoFactorAuthCode({ email })
      ).unwrap();

      if (res && res.message) {
        Toast.success(res.message);
        setCountdown(30);
        setIsTimerActive(true);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => onClose();

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.confirm_code_second}>
        <div className={styles.inner_block}>
          <div className={styles.img_close2}>
            <CloseIcon onClick={handleCancel} className={styles.close_btn} />
          </div>

          <h2 className={styles.h2_confirm_code}>
            Մուտքագրեք Ձեզ ուղարկված կոդը
          </h2>

          <div className={styles.otp_input_container}>
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                className={styles.otp_input}
              />
            ))}
          </div>

          <MainButton onClick={handleConfirm} className={styles.button_confirm}>
            Հաստատել
          </MainButton>

          <div>
            <button
              onClick={handleResendCode}
              className={styles.button_cancel}
              disabled={isTimerActive}
            >
              {isTimerActive ? (
                <span>Նորից ուղարկել կոդը ({countdown})</span>
              ) : (
                "Նորից ուղարկել կոդը"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowConfirmCode;

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { colors } from "@mui/material";

const SuccessModal = ({
  isOpen = false,
  onClose,
  title,
  children,
  disableBackdropClick,
  className,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.2,
    textAlign: "center",
    outline: "none",
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      aria-labelledby="transition-modal-title"
      disableBackdropClick={disableBackdropClick}
      aria-describedby="transition-modal-description"
      className={className}
      slotProps={{
        backdrop: {
          timeout: 600,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <img width={48} height={48} alt="success" src="/images/success.jpg" />
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SuccessModal;

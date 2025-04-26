import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../../store/modal/slice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Fade, IconButton } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 6,
  borderRadius: 5,
  p: 4,
  outline: "none",
  padding: "60px 80px",
};

const BasicModal = ({
  color,
  modalId,
  children,
  variant,
  startIcon,
  title = "",
  isIconButton,
  hasCloseIcon = true,
  modalStyle = {},
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) =>
    modalId ? state.modal.modals[modalId] ?? false : state.modal.singleModal
  );

  const handleOpen = () => {
    dispatch(setModalOpen({ modalId, isOpen: true }));
  };

  const handleClose = () => {
    dispatch(setModalOpen({ modalId, isOpen: false }));
  };

  return (
    <div>
      {isIconButton ? (
        <IconButton color={color} variant={variant} onClick={handleOpen}>
          {title}
        </IconButton>
      ) : (
        <Button
          color={color}
          variant={variant}
          onClick={handleOpen}
          startIcon={startIcon}
        >
          {title}
        </Button>
      )}
      <Modal
        open={isOpen}
        closeAfterTransition
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        slotProps={{
          backdrop: {
            timeout: 600,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={{ ...style, ...modalStyle }}>
            {hasCloseIcon && (
              <IconButton
                aria-label="close"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon onClick={handleClose} />
              </IconButton>
            )}

            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BasicModal;

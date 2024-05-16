import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { green, red } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import CircularProgress from "@mui/material/CircularProgress";
import { useUserContext } from "../hooks/userContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomAlert() {
  const { customMsg, setCustomMsg } = useUserContext();
  const [success, setSuccess] = React.useState(false);
  console.log(customMsg.isVisible);
  React.useEffect(() => {
    setSuccess(false);
    setTimeout(function () {
      setSuccess(true);
    }, 1500);
  }, [customMsg.isVisible]);

  return (
    <Dialog
      open={customMsg.isVisible}
      TransitionComponent={Transition}
      keepMounted
      onClose={() =>
        setCustomMsg({
          ...customMsg,
          isVisible: false,
        })
      }
      maxWidth="xs"
      fullWidth
    >
      <DialogContent sx={{ textAlign: "center" }}>
        <div className="offset-lg-3 col-lg-6  circleProgress">
          {!success ? (
            <CircularProgress
              size={70}
              sx={{ color: customMsg.type === "error" ? red[700] : green[500] }}
            />
          ) : (
            <Fab
              aria-label="save"
              sx={{ height: 70, width: 70 }}
              color={customMsg.type === "error" ? "error" : "secondary"}
            >
              {customMsg.type === "error" ? (
                <GppMaybeIcon sx={{ fontSize: 60 }} />
              ) : (
                <CheckIcon sx={{ fontSize: 60 }} />
              )}
            </Fab>
          )}
        </div>
        <p>{customMsg.text}</p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 150 }}
          onClick={() =>
            setCustomMsg({
              ...customMsg,
              isVisible: false,
            })
          }
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default CustomAlert;

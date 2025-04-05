import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useId, useState } from "react";
import { SocketCallCompletedData } from "@/utils/socketTypes";
import { useAppSelector } from "@/store/store";
import { ThankYouProps } from "./thankYou.interface";
import appTheme from "@/theme";
import Btn from "../button";

const ThankYou: React.FC<ThankYouProps> = ({ closeThankYou, callStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noCall, setNoCall] = useState(false);
  const [callData, setCallData] = useState({
    expertName: "",
    duration: "",
  });

  const userInfo = useAppSelector((state) => state.authUserReducer.data);

  const { _id } = userInfo || {};

  useEffect(() => {
    if (callStatus) {
      const { duration, expertName, isSuccess, userId } = callStatus;
      if (userId && isSuccess && _id && userId === _id) {
        closeThankYou();
        setIsOpen(true);
        setCallData({
          expertName,
          duration,
        });
      } else if (userId && !isSuccess && _id && userId === _id) {
        closeThankYou();
        setNoCall(true);
      }
    }
  }, [_id, callStatus, closeThankYou]);

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        maxWidth="md"
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle
          align="center"
          variant="h5"
          className="font-mediumFont"
          fontWeight={500}
          sx={{
            bgcolor: appTheme.colors.goldDark,
          }}
        >
          Thank you for speaking with{" "}
          <Box
            component={"span"}
            fontWeight={"600"}
            color={appTheme.colors.green}
          >
            {callData?.expertName || "Expert"}
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: appTheme.colors.goldDark,
          }}
        >
          <Box>
            <Typography
              align="center"
              className="font-mediumFont"
              variant="body1"
              fontWeight={"400"}
              color={appTheme.colors.darkGray}
              mt={2}
            >
              We hope this conversation brought you Sukoon.
            </Typography>
            <Typography
              align="center"
              variant="body1"
              className="font-mediumFont"
              fontWeight={"400"}
              color={appTheme.colors.darkGray}
              mt={2}
              mb={4}
            >
              (Please give your valuable feedback via whatsapp.)
            </Typography>
            <Typography className="font-mediumFont" align="center" variant="h5" fontWeight={500}>
              Call duration:{"  "}
              <Box
                component={"span"}
                fontWeight={"600"}
                color={appTheme.colors.green}
              >
                {callData?.duration}
              </Box>
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 2,
              }}
            >
              <Btn
                text="Back to Home"
                color="yellow"
                onClick={() => setIsOpen(false)}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/*  */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={noCall}
        onClose={() => setNoCall(false)}
      >
        <DialogTitle
          align="center"
          variant="h5"
          fontWeight={500}
          sx={{
            bgcolor: appTheme.colors.goldDark,
          }}
        >
          The Sukoon Sarathi appears to be busy. Please try another Sarathi or
          try again after some time.
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: appTheme.colors.goldDark,
          }}
        >
          <Typography
            variant="h6"
            align="center"
            color={appTheme.colors.darkGray}
          >
            Please call +91
            <Box component={"span"} fontWeight={600}>
              8660610840{" "}
            </Box>
            for assistance.
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Btn
              text="Back to Home"
              color="yellow"
              onClick={() => setNoCall(false)}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThankYou;

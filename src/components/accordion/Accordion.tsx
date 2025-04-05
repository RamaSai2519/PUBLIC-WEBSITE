import styled from "@emotion/styled";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import appTheme from "@/theme";

interface SukoonAccordionProps {
  title: string;
  details: React.ReactNode;
}

const Accordion = styled((props: any) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    {...props}
    sx={{
      mt: 2,
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: "none",
    }}
  />
))(() => ({
  border: `none`,
  "&:before": {
    display: "none",
  },
  "& .MuiPaper-root": {
    borderRadius: 8,
  },
}));

const AccordionSummary = styled((props: any) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowDown />} {...props} />
))(({ theme }) => ({
  backgroundColor: appTheme.colors.goldDark,
  ":hover": {
    backgroundColor: appTheme.colors.goldLight,
  },
  minHeight: "34px",
  fontWeight: "500",
  fontSize: 18,

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: 2,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  paddingBlock: 16,
  paddingInline: 24,
  border: "none",
  backgroundColor: "#fff",
}));

const SukoonAccordion: React.FC<SukoonAccordionProps> = (props) => {
  return (
    <Accordion>
      <AccordionSummary className="font-extrabold bg-primaryYellow">{props.title}</AccordionSummary>
      <AccordionDetails>
        <Typography
          component={"span"}
          className="font-lightFont"
         
          color={appTheme.colors.darkGray}
        >
          {props?.details}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default SukoonAccordion;

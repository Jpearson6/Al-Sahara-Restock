import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  MobileStepper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";

const ImagePreview = ({ selectedImage, setSelectedImage }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = selectedImage.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      open={selectedImage !== null}
      onClose={() => setSelectedImage(null)}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent sx={{ color: "black", width: "100%", height: "100%" }}>
        {selectedImage && (
          <>
            <Box
              component="img"
              sx={{
                width: "100%", // Make image span full width
                height: "100%", // Make image span full height
                objectFit: "contain", // Preserve aspect ratio
              }}
              src={selectedImage[activeStep]}
              alt={`Image ${activeStep + 1}`}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

ImagePreview.propTypes = {
  selectedImage: PropTypes.array,
  setSelectedImage: PropTypes.func,
};

export default ImagePreview;

import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  backdropClasses,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImagePreview = (props) => {
  const { selectedImage, setSelectedImage } = props;

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
      <DialogContent sx={{ color: "black" }}>
        {selectedImage && (
          <div
            style={{
              position: "relative",
              maxWidth: "100%",
              maxHeight: "80vh",
            }}
          >
            <Box borderRadius={10}>
              <img
                src={selectedImage}
                alt="Uploaded Image"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: '5%' }}
              />
            </Box>

            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: "fixed",
                top: 10,
                right: 10,
                color: "grey",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: "32px",
                width: "32px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
        <Button >
            Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePreview;

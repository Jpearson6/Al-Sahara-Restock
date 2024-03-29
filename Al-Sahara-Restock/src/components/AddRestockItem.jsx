import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Card, Input, Paper, Stack, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import ImagePreview from "./ImagePreview";

export default function AddRestockItem({ open, setOpen }) {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImages([...images, file]);
  };

  const handleCaptureClick = () => {
    // Check if the capture attribute is supported
    const isCaptureSupported = "capture" in document.createElement("input");
    if (isCaptureSupported) {
      console.log("camera");
      // Trigger the file input click event to open the camera
      const fileInput = document.getElementById("image-upload");
      fileInput.click();
    } else {
      console.log(" no camera");
      // Fallback: Provide instructions for manually taking a picture
      alert(
        "Your device does not support camera capture. Please take a picture manually."
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"xs"}
        fullWidth={true}
      >
        <DialogTitle>New Item</DialogTitle>
        <DialogContent
          sx={{
            justifyContent: "center",
          }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="item"
            name="item"
            label="item name"
            type="text"
            fullWidth
            variant="standard"
          />

          <Stack
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            pt={3}
          >
            {images && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  py: 1,
                  overflow: "auto",
                  width: "100%",
                  scrollSnapType: "x mandatory",
                  "& > *": {
                    scrollSnapAlign: "center",
                  },
                  "::-webkit-scrollbar": { display: "none" },
                }}
              >
                {images.map((image) => (
                  <Card
                    orientation="horizontal"
                    size="sm"
                    key={image.name}
                    variant="outlined"
                    onClick={() => setSelectedImage(URL.createObjectURL(image))}
                  >
                    <AspectRatio
                      key={image.name}
                      ratio="1"
                      sx={{ minWidth: 60 }}
                    >
                      <img
                        key={image.name}
                        src={URL.createObjectURL(image)}
                        alt="Uploaded Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </AspectRatio>
                  </Card>
                ))}
              </Box>
            )}
            <ImagePreview selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              //capture="camera" // This attribute triggers camera capture
              style={{ display: "none" }} // Hiding the default input appearance
              id="image-upload"
            />
            <Button variant="contained" color="primary" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }} // Hiding the default input appearance
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// AddRestockItem.propTypes = {
//     rows: PropTypes.array,
//     setRows: PropTypes.func
//   };

{
  /* <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            capture="camera" // This attribute triggers camera capture
            style={{ display: "none" }} // Hiding the default input appearance
            id="image-upload"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCaptureClick}
          >
            Take Picture
          </Button>
          <Button variant="contained" color="primary" component="label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hiding the default input appearance
            />
          </Button> 
          
          
           {selectedFile && (
        <div>
          <Typography variant="subtitle1">Selected File: {selectedFile.name}</Typography>
          <img src={URL.createObjectURL(selectedFile)} alt="Uploaded Image" style={{ maxWidth: '100%' }} />
        </div>
      )}
      
      <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        width: 343,
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {images.map((item) => (
        <Card orientation="horizontal" size="sm" key={item.title} variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
            <img
              srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?h=120&fit=crop&auto=format`}
              alt={item.title}
            />
          </AspectRatio>
        </Card>
      ))}
    </Box>
    
    */
}

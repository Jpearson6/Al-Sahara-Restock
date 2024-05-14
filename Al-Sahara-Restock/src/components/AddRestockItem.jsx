import * as React from "react";
import {
  Box,
  Card,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";

import { addNewItem, uploadImagesAndReturnURLs } from "../firebase/utils";
import PropTypes from "prop-types";
import CircularLoading from "./CircularLoading";

export default function AddRestockItem({ open, setOpen, rows, setRows }) {
  const [images, setImages] = React.useState([]);
  const [itemName, setItemName] = React.useState("");
  const [showLoading, setShowLoading] = React.useState(false);

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

  const handleClose = () => {
    setImages([]);
    setItemName("");
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (itemName === "") {
      console.log("Invalid Entry");
      return;
    }

    setShowLoading(true);
    try {
      let imageUrls = [];
      if (images.length > 0) {
        // Wait for the image URLs to be retrieved
        imageUrls = await uploadImagesAndReturnURLs(images);
      }

      try {
        const newItem = {
          item: itemName,
          imageRef: imageUrls, // Now imageUrls will have the resolved URLs
          delivered: false,
          ordered: false,
        };
        handleClose();
        setShowLoading(false);
        const id = await addNewItem(newItem);
        setRows([...rows, { ...newItem, id: id }]);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  if (showLoading) {
    return <CircularLoading />;
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"xs"}
        fullWidth={true}
      >
        <DialogTitle>New Item</DialogTitle>

        {showLoading ? (
          <DialogContent>
            <CircularLoading />
          </DialogContent>
        ) : (
          <>
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
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
                <input
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
              </Stack>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}

AddRestockItem.propTypes = {
  rows: PropTypes.array,
  setRows: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

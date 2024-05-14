import * as React from "react";
import { Divider, Fab, Typography } from "@mui/material";

import AddRestockItem from "./AddRestockItem";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { getRestockItems } from "../firebase/utils";
import ImagePreview from "./ImagePreview";
import ItemList from "./ItemList";
import PropTypes from "prop-types";
import CircularLoading from "./CircularLoading";

const StyledFab = styled(Fab)({
  position: "fixed",
  zIndex: 1,
  bottom: "10%",
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function RestockList({ role }) {
  const [rows, setRows] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showLoading, setShowLoading] = React.useState(true);

  React.useEffect(() => {
    getRestockItems(setRows);
  }, []);

  React.useEffect(() => {
    // Show loading for 1 second before showing the image preview
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [showLoading]);

  if (showLoading) {
    return <CircularLoading />;
  }

  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h5"
        paddingY={2}
        fontFamily={"Roboto"}
      >
        Restock
      </Typography>
      <Divider />
      <AddRestockItem
        open={open}
        setOpen={setOpen}
        setRows={setRows}
        rows={rows}
      />

      {selectedImage && (
        <ImagePreview
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      <StyledFab color="secondary">
        <AddIcon onClick={() => setOpen(true)} />
      </StyledFab>
      <ItemList
        rows={rows}
        setRows={setRows}
        role={role}
        setSelectedImage={setSelectedImage}
        listType={"Ordered"}
      />
    </>
  );
}

RestockList.propTypes = {
  role: PropTypes.string
};
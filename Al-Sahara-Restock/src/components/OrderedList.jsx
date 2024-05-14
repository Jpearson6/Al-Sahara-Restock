import * as React from "react";
import { getOrderedItems } from "../firebase/utils";
import ImagePreview from "./ImagePreview";
import ItemList from "./ItemList";
import { Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CircularLoading from "./CircularLoading";

export default function OrderedList({ role }) {
  const [rows, setRows] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showLoading, setShowLoading] = React.useState(true);

  React.useEffect(() => {
    getOrderedItems(setRows);
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
        Ordered
      </Typography>
      <Divider />
      {selectedImage && (
        <ImagePreview
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      <ItemList
        rows={rows}
        setRows={setRows}
        role={role}
        setSelectedImage={setSelectedImage}
        listType={"Delivered"}
      />
    </>
  );
}

OrderedList.propTypes = {
  role: PropTypes.string,
};

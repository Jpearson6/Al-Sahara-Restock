import * as React from "react";
import { getOrderedItems } from "../firebase/utils";
import ImagePreview from "./ImagePreview";
import ItemList from "./ItemList";
import { Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function OrderedList({role}) {
  const [rows, setRows] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);

  React.useEffect(() => {
    getOrderedItems(setRows);
  }, []);

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
      <ItemList rows={rows} setRows={setRows} role={role} setSelectedImage={setSelectedImage} listType={'Delivered'}/>
    </>
  );
}

OrderedList.propTypes = {
  role: PropTypes.string
};
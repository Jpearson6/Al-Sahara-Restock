import * as React from "react";
import {
  Box,
  Checkbox,
  Divider,
  Fab,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { firestore } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import AddRestockItem from "./AddRestockItem";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  bottom: 60,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function RestockList({ role }) {
  const [rows, setRows] = React.useState(null);
  const [open , setOpen] = React.useState(false);

  const handleCheckboxOrdered = (index) => {
    if (role === "employee") return;
    markItemAsOrdered(rows[index].id);
    const newRows = [...rows.slice(0, index), ...rows.slice(index + 1)];
    setRows(newRows);
  };

  const markItemAsOrdered = async (itemId) => {
    try {
      // Get a reference to the item document
      const itemDocRef = doc(firestore, "items", itemId);

      // Update the "ordered" field to true
      await updateDoc(itemDocRef, {
        ordered: true,
      });
      return true; // Return true to indicate success
    } catch (error) {
      console.error("Error marking item as ordered:", error);
      return false; // Return false to indicate failure
    }
  };

  React.useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(firestore, "items");
      const q = query(itemsCollection, where("ordered", "==", false));

      try {
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setRows(items);
        return;
      } catch (error) {
        console.error("Error fetching items:", error);
        return;
      }
    };

    fetchItems();
  }, []);

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
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItemButton alignItems="center">
          <ListItemAvatar>Image</ListItemAvatar>
          <ListItemText
            primary={
              <Typography textAlign={"center"} justifyContent={"center"}>
                Flum
              </Typography>
            }
          />
        </ListItemButton>
      </List>
      <AddRestockItem open={open} setOpen={setOpen}/>
      <StyledFab color="secondary">
        <AddIcon onClick={() => setOpen(true)}/>
      </StyledFab>
    </>
  );
}

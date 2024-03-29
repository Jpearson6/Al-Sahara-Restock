import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";

import { firestore } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function OrderedList() {
  const [orderedItems, setOrderedItems] = React.useState(null);

  const handleCheckboxDelivered = (index) => {
    markItemAsDelivered(orderedItems[index].id);
    const newRows = [...orderedItems.slice(0, index), ...orderedItems.slice(index + 1)];
    setOrderedItems(newRows);
  };

  const markItemAsDelivered = async (itemId) => {
    try {
      // Get a reference to the item document
      const itemDocRef = doc(firestore, "items", itemId);

      // Update the "ordered" field to true
      await updateDoc(itemDocRef, {
        arrived: true,
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
      const q = query(
        itemsCollection,
        where("ordered", "==", true),
        where("arrived", "==", false)
      );

      try {
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setOrderedItems(items);
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "xs" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Employee </TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Arrived</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedItems &&
              orderedItems.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.arrived}
                      onChange={() => handleCheckboxDelivered(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

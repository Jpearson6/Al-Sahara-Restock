import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Card, Stack } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { menuComponents } from "../components/MenuComponents";
import React from "react";
const OwnerView = ({role}) => {
  const [selectedItem, setSelectedItem] = React.useState('UserList');

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("signed out"))
      .catch((err) => console.log(err));
  };

  const findSelectedComponent = (selectedItem) => {
    const component = [...menuComponents(role)].filter(
      (comp) => comp.title === selectedItem
    );
    if (component.length === 1) return component[0];

    console.log(
      "In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item."
    );
    return {
      title: null,
      component: null,
    };
  };

  const handleSelectedItem = (title) => {
    setSelectedItem(title);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        maxHeight: "100%",
        overflow: "auto",
      }}
    >
      <Card>
        <AppBar position="static">
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button onClick={() => handleSelectedItem('UserList')} color="inherit">Users</Button>
            <Button onClick={() => handleSelectedItem('RestockList')}  color="inherit">Restock</Button>
            <Button onClick={() => handleSelectedItem('OrderedList')}  color="inherit">Ordered</Button>
            <Button color="inherit" onClick={handleSignOut}>
              Log Out
            </Button>
          </Stack>
        </AppBar>
        {findSelectedComponent(selectedItem).component}
      </Card>
    </Box>
  );
};

export default OwnerView;

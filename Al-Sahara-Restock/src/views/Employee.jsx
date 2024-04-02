import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { CssBaseline, Stack, Toolbar } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { menuComponents } from "../components/MenuComponents";
import PropTypes from "prop-types";


const EmployeeView = ({ role }) => {
  const [selectedItem, setSelectedItem] = React.useState("RestockList");

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
      <React.Fragment>
        <CssBaseline/>
        {findSelectedComponent(selectedItem).component}
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Stack direction={"row"}>
              <Button
                onClick={() => handleSelectedItem("RestockList")}
                color="inherit"
              >
                Restock
              </Button>
              <Button
                onClick={() => handleSelectedItem("OrderedList")}
                color="inherit"
              >
                Ordered
              </Button>
              <Button color="inherit" onClick={handleSignOut}>
                Log Out
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </React.Fragment>
  );
};

EmployeeView.propTypes = {
  role: PropTypes.string,
};


export default EmployeeView;

import EmployeeView from "../views/Employee";
import OwnerView from "../views/Owner";
import PropTypes from "prop-types";

const HomePage = ({ user }) => {
  if (user.role === "owner") {
    return <OwnerView role={user.role}/>;
  } else return <EmployeeView role={user.role}/>;
};

HomePage.propTypes = {
  user: PropTypes.object,
};

export default HomePage;

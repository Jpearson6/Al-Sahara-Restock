import { Navigate } from "react-router-dom";
import PropTypes  from 'prop-types';

export const ProtectedRoute = ({children , user}) => {
    return user ? children : <Navigate to={'/'}/>
}

ProtectedRoute.propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };
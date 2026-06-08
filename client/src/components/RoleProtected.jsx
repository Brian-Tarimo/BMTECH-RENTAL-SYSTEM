import {
    Navigate
  } from "react-router-dom";
  
  function RoleProtected({
  
    children,
  
    allowedRoles
  
  }) {
  
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );
  
    if (
      !allowedRoles.includes(
        user?.role
      )
    ) {
  
      return (
        <Navigate
          to="/dashboard"
        />
      );
  
    }
  
    return children;
  }
  
  export default RoleProtected;
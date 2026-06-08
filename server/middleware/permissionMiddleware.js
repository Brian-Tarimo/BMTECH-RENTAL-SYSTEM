const rolePermissions =
  require("../config/rolePermissions");

const authorizePermissions =
  (...requiredPermissions) => {

    return (req, res, next) => {

      const userRole =
        req.user.role;

      const userPermissions =
        rolePermissions[userRole] || [];

      const hasPermission =
        requiredPermissions.every(
          (perm) =>
            userPermissions.includes(
              perm
            )
        );

      if (!hasPermission) {

        return res.status(403).json({
          message:
            "You do not have permission to perform this action",
        });

      }

      next();

    };

  };

module.exports =
  authorizePermissions;
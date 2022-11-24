const jwt = require("jsonwebtoken");
module.exports = {
  authorisedRoles: (...roles) => {
    return (req, res, next) => {
      if (roles.includes(req.decoded.role)) {
        next();
      } else {
        return res.status(401).send({ message: "unauthorized access" });
      }
    };
  },
};

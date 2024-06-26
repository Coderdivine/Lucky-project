const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const { role, JWT_SECRET } = require("../config");
const CustomError = require("../utils/custom-error");

/*
 *
 * If no role is passed the default role is user
 *
 * @param  {any[]} roles List of roles allowed to access the route
 * Verify JWT token...
 * Recreate JWT authentication token
 * Check access
 * OnlyAdmin
 * MainAdmin
 * 
 */

const authForAdmin = () => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authenticating for admin...");
    const adminId = req.body.admin_id || req.params.admin_id;
    const verifiedToken = validateToken(authHeader);
    req.admin_id = verifiedToken.admin_id;
    const admin = await Admin.findOne({ admin_id: verifiedToken.admin_id });
    if (!admin) throw new CustomError("Please create an admin account first.");
    console.log({ admin_id: req.admin_id });
    next();
  };
};

const validateToken = (bearer_token) => {
  if(!bearer_token) throw new CustomError("Please provide a valid token.", 400);
  const token = bearer_token.split(" ")[1] || bearer_token;
  const verified = JWT.verify(token, JWT_SECRET);
  console.log({ token, verified })

  if (!verified) {
    throw new Error("Session expired. Login again to continue.");
  }

  return verified;
}

module.exports = authForAdmin; 

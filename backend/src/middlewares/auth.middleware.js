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

const auth = () => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const userId = req.body.user_id || req.params.user_id;

    let tokenUserId;
      tokenUserId = validateToken(authHeader);
      req.user_id = tokenUserId.user_id;
      const user = await User.findOne({ user_id: tokenUserId.user_id });
      if(!user) throw new CustomError("User not found.", 400);
      console.log({ auth_user_id: req.user_id });
    next();
  };
};

const validateToken = (bearer_token) => {
  if(!bearer_token) throw new CustomError("Please provide a valid token.", 400);
  const token = bearer_token?.split(" ")[1] || bearer_token;
  const verified = JWT.verify(token, JWT_SECRET);

  if (!verified) {
    throw new Error("Session expired. Login again to continue.");
  }

  return verified;
}

module.exports = auth; 

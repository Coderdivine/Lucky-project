const JWT = require("jsonwebtoken");
const { role, JWT_SECRET } = require("../config");
const CustomError = require("../utils/custom-error");


const createToken = (object) => {
    const token = JWT.sign(object, JWT_SECRET, { expiresIn: '24h' });
    if (!token) throw new CustomError("Unable to create token.");
    console.log({ token });
    return "bearer " + token;

}

module.exports = createToken;
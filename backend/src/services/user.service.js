const { BCRYPT_SALT, DEFAULT_ID, PLANS } = require("../config");
const CustomError = require("./../utils/custom-error");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const User = require("../models/user.model");
const createToken = require("../middlewares/token.middleware");
class UserService {
  constructor() {
    return true;
  }

  async regsiter(data) {
    console.log({ data });
    const NIN = data?.nin;
    const user_id = uuid.v4();
    const user = await User.findOne({ nin: NIN });
    if(user) throw new CustomError("NIN already registered.", 400);
    if((user?.email) == data?.email) throw new CustomError("Email already registered", 400);
    const newUser = new User({ ...data, user_id });
    const save = await newUser.save();
    return save;
  }
  
}

module.exports = new UserService();

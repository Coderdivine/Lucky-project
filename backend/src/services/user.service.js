const { BCRYPT_SALT, DEFAULT_ID, PLANS } = require("../config");
const CustomError = require("./../utils/custom-error");
const NCC_NIN = require("./../utils/nin.json");
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
    const isEmail = await User.findOne({ email: data?.email });
    if(isEmail) throw new CustomError("Email address already used.", 400);
    if(NIN.length >= 11 || NIN.length <= 8) throw new CustomError("NIN length is invalid", 400);
    const isNinValid = this.isNinValid(NIN);
    console.log({ isNinValid });
    if(!isNinValid) throw new CustomError("Invalid NIN, not found in your database", 400);
    if(user) throw new CustomError("NIN already registered.", 400);
    if((user?.email) == data?.email) throw new CustomError("Email already registered", 400);
    const newUser = new User({ ...data, user_id });
    const save = await newUser.save();
    return save;
  }
  
  isNinValid(_nin) {
    return NCC_NIN?.some(nin => nin == (_nin)) || false;
  }
  
}

module.exports = new UserService();

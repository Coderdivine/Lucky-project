const JWT = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const AdminPayment = require("../models/admin-payment.model");
const CustomError = require("../utils/custom-error");


const auth = () => {
  return async (req, res, next) => {
    const admin = await User.findOne({ admin_id: req.admin_id });
    if(!admin) throw new CustomError("Admin not found.", 400);    
    if(admin?.next_subscription > (Date.now() + 100000)) throw new CustomError(`Please contact ${admin?.username}`, 400) 

    next();
  };
};


module.exports = auth; 

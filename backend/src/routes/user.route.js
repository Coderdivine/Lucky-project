//const { role } = require("../config");
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware")();
const UserCtrl = require("../controllers/user.controller");

router.post("/register", UserCtrl.register);

module.exports = router;

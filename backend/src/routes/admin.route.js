//const { role } = require("../config");
const router = require("express").Router();
const auth = require("../middlewares/authAdmin.middleware")();
const AdminCtrl = require("../controllers/admin.controller");
const authAdmin = require("../middlewares/mainAdmin.middleware")();


router.post("/register", AdminCtrl.register);

router.post("/login", AdminCtrl.login);

router.post("/v-registration", auth, AdminCtrl.verifyregistrationPin);

router.post("/r-registration", AdminCtrl.resendVerificationCode);

router.post("/forgot-password", AdminCtrl.sendForgotPasswordCode);

router.post("/v-forgot-password", AdminCtrl.verifyForgotPasswordPin);

router.post("/r-forgot-password", AdminCtrl.resendForgotPasswordCode);

router.post("/all-pools", AdminCtrl.allPools);
router.post("/create-pool", AdminCtrl.createPool);
router.get("/admin-pools/:admin_id", AdminCtrl.getAdminPools);
router.post("/get-pools", AdminCtrl.getPools);
router.get("/pool/:pool_id", AdminCtrl.getPool);
router.get("/registerer/:pool_id", AdminCtrl.poolRegisterer);


module.exports = router;

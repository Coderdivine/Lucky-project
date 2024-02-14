const router = require("express").Router();

// Trim all incoming requests
//router.use(require("./../middlewares/trim-incoming-requests.middleware"));


router.use("/user", require("./user.route"));
router.use("/admin", require("./admin.route"));

router.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello world from lucky!" });
});

module.exports = router;

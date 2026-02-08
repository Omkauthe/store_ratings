const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const c = require("../controllers/user.controllers");

router.get("/stores", auth, role(["USER"]), c.stores);
router.post("/rate", auth, role(["USER"]), c.rate);

module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const c = require("../controllers/owner.controllers");

router.use(auth, role("STORE_OWNER"));
router.get("/dashboard", c.dashboard);

module.exports = router;

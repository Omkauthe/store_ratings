const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const c = require("../controllers/user.controllers");

router.use(auth, role("USER"));
router.get("/stores", c.stores);
router.post("/rate", c.rate);

module.exports = router;

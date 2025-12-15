const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const c = require("../controllers/admin.controllers");

router.use(auth, role("ADMIN"));
router.get("/dashboard", c.dashboard);
router.post("/users", c.addUser);
router.post("/stores", c.addStore);

module.exports = router;

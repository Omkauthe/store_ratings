const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../db");
//const router = express.Router();

const c = require("../controllers/auth.controllers");
const a = require("../middleware/auth.middleware");

router.post("/register", c.register);
router.post("/login", c.login);

router.put("/update-password", a, async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id; 

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, userId]
  );

  res.json({ message: "Password updated successfully" });
});

module.exports = router;

const db = require("../db");
const bcrypt = require("bcrypt");

exports.dashboard = (req, res) => {
  db.query(
    `SELECT 
    (SELECT COUNT(*) FROM users) users,
    (SELECT COUNT(*) FROM stores) stores,
    (SELECT COUNT(*) FROM ratings) ratings`,
    (err, result) => res.json(result[0])
  );
};

exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users VALUES (NULL,?,?,?,?,?,NOW())",
    [name, email, hash, address, role],
    () => res.json({ message: "User added" })
  );
};

exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;
  db.query(
    "INSERT INTO stores VALUES (NULL,?,?,?,?,NOW())",
    [name, email, address, owner_id],
    () => res.json({ message: "Store added" })
  );
};

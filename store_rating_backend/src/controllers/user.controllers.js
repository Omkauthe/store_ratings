const db = require("../db");

exports.stores = (req, res) => {
  db.query(
    `SELECT s.*, AVG(r.rating) rating
     FROM stores s
     LEFT JOIN ratings r ON s.id=r.store_id
     GROUP BY s.id`,
    (err, result) => res.json(result)
  );
};

exports.rate = (req, res) => {
  const { store_id, rating } = req.body;
  db.query(
    `INSERT INTO ratings (user_id,store_id,rating)
     VALUES (?,?,?)
     ON DUPLICATE KEY UPDATE rating=?`,
    [req.user.id, store_id, rating, rating],
    () => res.json({ message: "Rating submitted" })
  );
};

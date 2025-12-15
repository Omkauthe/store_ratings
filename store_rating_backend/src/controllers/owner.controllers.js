const db = require("../db");

exports.dashboard = (req, res) => {
  db.query(
    `SELECT u.name, r.rating
     FROM ratings r
     JOIN users u ON r.user_id=u.id
     JOIN stores s ON r.store_id=s.id
     WHERE s.owner_id=?`,
    [req.user.id],
    (err, result) => res.json(result)
  );
};

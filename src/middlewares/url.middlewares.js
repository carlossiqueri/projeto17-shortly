import { db } from "../database/database.connection.js";

export const validateUrlId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const checkUrl = await db.query(`SELECT * FROM urls WHERE id=$1`, [id]);
    if (!checkUrl.rows[0]) return res.sendStatus(404);

    res.locals.urlObj = checkUrl.rows[0];

  } catch (err) {
    res.status(500).send(err.message);
  }
  next();
};

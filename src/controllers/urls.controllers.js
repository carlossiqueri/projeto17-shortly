import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

const urlShorten = async (req, res) => {
  const { url } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const shorterUrl = nanoid(8);

  // Route aut:
  if (!token) return res.sendStatus(401);

  try {
    // first get the user with the token than verify if session is active
    const verifySession = await db.query(
      `SELECT * FROM session WHERE token=$1`,
      [token]
    );
    if (verifySession.rows.length === 0) return res.sendStatus(401);

    // saves the verified user in a variable
    const user = verifySession.rows[0];

    await db.query(
      `INSERT INTO urls(url, shorten_url, user_id) VALUES($1, $2, $3);`,
      [url, shorterUrl, user.user_id]
    );

    const saveUrl = await db.query(`SELECT * FROM urls WHERE url=$1`, [url]);

    res.status(201).send({ id: saveUrl.id, shortUrl: shorterUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export const urlShorten = async (req, res) => {
  const { url } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const shorterUrl = nanoid(8);
  const { user } = res.locals;

  // Route aut:
  if (!token) return res.sendStatus(401);

  try {
    await db.query(
      `INSERT INTO urls(url, shorten_url, user_id) VALUES($1, $2, $3) RETURNING id;`,
      [url, shorterUrl, user.user_id]
    );

    const { id } = result.rows[0];

    res.status(201).send({ id: id, shortUrl: shorterUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export const urlShorten = async (req, res) => {
  const { url } = req.body;
  const { authorization } = req.headers;
  const { user } = res.locals;
  const token = authorization?.replace("Bearer ", "");
  
  // Route aut:
  if (!token) return res.sendStatus(401);
  
  const shorterUrl = nanoid(8);

  try {
    await db.query(
      `INSERT INTO urls(url, shorten_url, user_id) VALUES($1, $2, $3) RETURNING id;`,
      [url, shorterUrl, user.user_id]
    );

    const { id } = rows[0];

    res.status(201).send({ id: id, shortUrl: shorterUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

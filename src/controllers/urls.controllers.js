import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export const urlShorten = async (req, res) => {
  const { url } = req.body;
  const { user } = res.locals;

  const shorterUrl = nanoid(8);

  try {
    const savedUrl = await db.query(
      `INSERT INTO urls(url, shorten_url, user_id) VALUES($1, $2, $3) RETURNING id;`,
      [url, shorterUrl, user.id]
    );

    const { id } = savedUrl.rows[0];

    res.status(201).send({ id: id, shortUrl: shorterUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

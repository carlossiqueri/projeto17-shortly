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

export const urlById = async (req, res) => {
  const { urlObj } = res.locals;
  console.log(urlObj);
  try {
    res.status(200).send({
      id: urlObj.id,
      shortUrl: urlObj.shorten_url,
      url: urlObj.url,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const redirectUrl = async (req, res) => {
  const { urlObj } = res.locals;
  const { shortUrl } = req.params;

  try {
    // primeiro incrementa a contagem de visitas
    await db.query(
      `UPDATE urls SET visit_count = visit_count + 1 WHERE shorten_url=$1`,
      [shortUrl]
    );

    // para depois redirecionar a pagina
    res.redirect(urlObj.url);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

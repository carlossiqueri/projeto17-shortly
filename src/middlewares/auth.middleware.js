import { db } from "../database/database.connection.js";

export const authValidate = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  // Route aut:
  if (!token) return res.sendStatus(401);

  try {
    // Verifica se o token existe
    const tokenVerify = await db.query(`SELECT * FROM session WHERE token=$1`, [
      token,
    ]);
    if (tokenVerify.rows.length === 0)
      return res.status(401).send("token not found");

    // Seleciona o user que tem o token

    const tokenUser = await db.query(`SELECT * FROM users WHERE id=$1`, [
      tokenVerify.rows[0].user_id,
    ]);
    if (!tokenUser.rows[0]) return res.status(401).send("user not found");

    res.locals.user = tokenUser.rows[0];
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const checkUser = await db.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (checkUser.rows.length !== 0)
      return res.status(409).send("Invalid email: already in use!");
    if ((password === confirmPassword)) {
      const newPass = bcrypt.hashSync(password, 10);
      await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, newPass]
      );
    }

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

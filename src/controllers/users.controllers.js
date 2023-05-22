import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const checkUser = await db.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (checkUser.rows.length !== 0)
      return res.status(409).send("Invalid email: already in use!");
    if (password === confirmPassword) {
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
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
  if (!user.rows[0]) return sendSatus(401);

  const checkPassword = bcrypt.compareSync(password, user.rows[0].password);

  if (!checkPassword) {
    res.sendStatus(401);
    return;
  } else {
    const token = uuid();
    try {
      await db.query(`INSERT INTO session(user_id, token) VALUES ($1, $2)`, [
        user.rows[0].id,
        token,
      ]);

      res.status(200).send(token);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};

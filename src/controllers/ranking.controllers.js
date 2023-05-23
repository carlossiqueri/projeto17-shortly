import { db } from "../database/database.connection.js";

const getRanking = async (req, res) => {
  try {
    const urlsLadder = await db.query(`
    SELECT users.id, name, COUNT (urls.id) AS "linksCount", SUM(visit_count) AS "visitCount" 
    FROM users LEFT JOIN urls ON users.id = urls.user_id 
    GROUP BY users.id, visit_count ORDER BY visit_count DESC LIMIT 10
        `);

        res.status(200 ).send(urlsLadder.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getRanking;

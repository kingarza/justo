// connect to PostgreSQL
const { Pool } = require("pg");

let postgresDbs = {
  // amazon
  user: "spyagencydb",
  host: "spyagencydb.cwh9fj8g269s.us-east-1.rds.amazonaws.com",
  database: "spyagencydb",
  password: "spyagencydb",
  port: 5432,
};

const pool = new Pool(postgresDbs);

async function getHits(user, filterField) {
  let query = "";
  if (user === "boss") {
    // el parámetro debe ser igual a 1.
    query = `SELECT * FROM hits WHERE 1 = $1;`;
  } else if (user === "manager") {
    query = `
      SELECT * FROM hits WHERE manager_id = $1
      UNION
      SELECT
        h.id,
        h.manager_id,
        h.hitman_id,
        h.description,
        h.target,
        h.status
      FROM
        hits h, managers m
      WHERE
        h.hitman_id = m.hitman_id
      AND
        m.email = $1;`;
  } else {
    query = `SELECT * FROM hits WHERE hitman_id = $1;`;
  }
  let data = await pool.query(query, [filterField]);
  return data.rows;
}

async function getHit(filterField) {
  let query = "SELECT * FROM hits WHERE id = $1";
  let data = await pool.query(query, [filterField]);
  return data.rows;
}

async function getMaxHitId() {
  let query = "SELECT MAX(id) FROM hits";
  let data = await pool.query(query);
  return data.rows[0].max;
}

async function createHit(user, params) {
  let query = "";
  if (user === "manager") {
    query = `
      INSERT INTO
        hits (id, manager_id, description, target, status)
      VALUES
        ('${params[0]}', '${params[1]}', '${params[2]}', '${params[3]}', '${params[4]}');`;
  } else if (user === "hitman") {
    query = `
      INSERT INTO
        hits (id, hitman_id, description, target, status)
      VALUES
      ('${params[0]}', '${params[1]}', '${params[2]}', '${params[3]}', '${params[4]}');`;
  }
  console.log("query");
  console.log(query);
  let data = await pool.query(query);
  return data.rows;
}

async function getDependents(user, filterField) {
  let query = "";
  if (user === "boss") {
    query = `SELECT email FROM managers UNION SELECT email FROM hitmen WHERE 1 = $1;`;
  } else if (user === "manager") {
    // se deben seleccionar todos los hitmen del manager
    query = `SELECT hitman_id FROM managers WHERE email = $1;`;
  }
  let data = await pool.query(query, [filterField]);
  return data.rows;
}

module.exports = {
  getHits,
  getHit,
  getDependents,
  createHit,
  getMaxHitId,
};

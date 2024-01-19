require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  port: process.env.POSTGRES_PORT,
});

const fetchdata = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, params.length ? params : null);
    return rows;
  } finally {
    client.release();
  }
};

const fetchMy = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const param = params?.[0];
    const { rows } = await client.query(SQL, param);
    return rows;
  } finally {
    client.release();
  }
};

const fetchrow = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = client.query(SQL, params.length ? params : null);
    return await row;
  } finally {
    client.release();
  }
};

module.exports = {
  fetchdata,
  fetchrow,
  fetchMy,
};

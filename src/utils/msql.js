require("dotenv").config();
const mysql = require("mysql2/promise");
// const { promisify } = require("util");

// `pool` obyektini promisify qilish

// class SqlData {
//   async sqlData(SQL, ...params) {
//     // Bog'lanishni yaratish
//     const pool = mysql.createPool({
//       connectionLimit: 10, // Bog'lanishlar soni
//       host: process.env.MDB_HOST,
//       user: process.env.MDB_USER,
//       password: process.env.MDB_PASSWORD,
//       database: process.env.MDB_DATABASE,
//     });
//     const asyncQuery = promisify(pool.query).bind(pool);

//     try {
//       const result = await asyncQuery(SQL, params);
//       return result;
//     } catch (err) {
//       console.log(err);
//     } finally {
//       // Bog'lanishni yopish
//       pool.end();
//     }
//   }
// }
// let querySQL = `
// SELECT p.*, pm2.meta_value as image_file FROM (
//         SELECT
//           p.ID,
//           p.post_title,
//           p.post_excerpt,
//           t.name AS product_category,
//           t.term_id AS product_id,
//           t.slug AS product_slug,
//           MAX(CASE WHEN pm1.meta_key = '_price' THEN pm1.meta_value ELSE NULL END) as price,
//           MAX(CASE WHEN pm1.meta_key = '_sku' THEN pm1.meta_value ELSE NULL END) as sku,
//           MAX(CASE WHEN pm1.meta_key = '_thumbnail_id' THEN pm1.meta_value ELSE NULL END) as thumbnail_id
//         FROM wp_posts p
//         LEFT JOIN wp_postmeta pm1 ON pm1.post_id = p.ID
//         LEFT JOIN wp_term_relationships AS tr ON tr.object_id = p.ID
//         JOIN wp_term_taxonomy AS tt ON tt.taxonomy = 'product_cat' AND tt.term_taxonomy_id = tr.term_taxonomy_id
//         JOIN wp_terms AS t ON t.term_id = tt.term_id
//         WHERE p.post_type IN ('product', 'product_variation') AND p.post_status = 'publish' AND p.post_content <> ''
//         GROUP BY p.ID, p.post_title
//       ) as p
//       JOIN wp_postmeta pm2 ON pm2.post_id = p.thumbnail_id
//       WHERE pm2.meta_key = '_wp_attached_file' AND p.ID IN (?);
// `;
class SqlData {
  async sqlData(SQL, ...params) {
    const connection = await mysql.createConnection({
      host: process.env.MDB_HOST,
      user: process.env.MDB_USER,
      password: process.env.MDB_PASSWORD,
      database: process.env.MDB_DATABASE,
    });
    try {
      const [rows, fields] = await connection.query(SQL, params);
      return rows;
    } finally {
      connection.end();
    }

    // return rows;
  }
}
// const query = new SqlData();
// query.sqlData(querySQL, [22656]);
module.exports = new SqlData();

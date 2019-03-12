const Pool = require('pg').Pool
const dbUser = process.env.DB_USER || require('../config.js').user;
const dbPw = process.env.DB_PW || require('../config.js').pw;

const pool = new Pool('shoes', dbUser, dbPw, {
  host: 'localhost',
  database: 'postgres',
  port: 5432,
});

const getShoeById = (request, response) => {
  const id = request.params.id
  console.log(typeof id);
  pool.query('SELECT * FROM shoes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createShoe = (request, response) => {
  const { id, name, img_url, short_desc, long_desc, type, price, rating, review_count, details } = request.body
  pool.query('INSERT INTO shoes (id, name, img_url, short_desc, long_desc, type, price, rating, review_count, details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', ['id', 'name', 'img_url', 'short_desc', 'long_desc', 'type', 'price', 'rating', 'review_count', 'details'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Shoe added with ID: ${results.id}`)
  })
}

const updateShoe = (request, response) => {
  const id = request.params.id
  const { name } = request.body

  pool.query(
    'UPDATE shoes SET name = $1 WHERE id = $2',
    ['id', 'name'],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Shoe modified with ID: ${id}`)
    }
  )
}

const deleteShoe = (request, response) => {
  const id = request.params.id
  pool.query('DELETE FROM shoes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getShoeById,
  createShoe,
  updateShoe,
  deleteShoe
}
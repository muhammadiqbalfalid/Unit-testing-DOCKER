// adjust with docker connectivity
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'latihan',
  password: 'bale123',
  port: 5432
})

module.exports = pool
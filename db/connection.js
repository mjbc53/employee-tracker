const mysql = require('mysql2')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'L3g0mjbc1234!',
    database: 'company'
  },
  console.log('Connected to the company database')
)

module.exports = db
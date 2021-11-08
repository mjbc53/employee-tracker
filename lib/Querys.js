const db = require('../db/connection')

class Querys {
  constructor(){}

  getRoles(){
    const sql = `SELECT * FROM roles`
    db.query(sql, (err, rows) => {
      if(err){
        console.log(err.message)
        return
      }
      console.table(rows)
    })
  }

  getEmployees(){
    const sql = `SELECT * FROM employees`
    db.query(sql, (err, rows) => {
      if(err){
        console.log(err.message)
        return
      }
      console.table(rows)
    })
  }
}

module.exports = Querys
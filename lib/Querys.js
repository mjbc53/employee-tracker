const db = require("../db/connection")
const Prompts = require('./Prompts')


class Querys extends Prompts {
  constructor(){
    super()

  }
  getRoles(){
    const sql = `SELECT roles.id, roles.title, roles.salary, 
    departments.names as department

    FROM roles
    
    INNER JOIN departments
    ON roles.department_id = departments.id;`

    db.query(sql, (err, rows) => {
      if(err){
        console.log(err.message)
        return
      }
      console.table(rows)
    })
  }

  getEmployees(){
    const sql = `
    SELECT  employees.id, employees.first_name, 
    employees.last_name, roles.title, roles.salary, 
    concat( e.first_name, ' ', e.last_name) as manager
    
    FROM employees

    INNER JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN employees e
    ON e.id = employees.manager_id
    `
    db.query(sql, (err, rows) => {
      if(err){
        console.log(err.message)
        return
      }
      console.table(rows)
    })
  }

  getDepartments(){
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, rows) => {
      if(err){
        console.log(err.message)
        return
      }
      console.table(rows)
    })
  }

  getCompleteTable(){
    const sql = `
    SELECT employees.id, employees.first_name, employees.last_name, 
    roles.title, departments.names as departments, roles.salary, 
    concat(e.first_name, ' ', e.last_name) as manager

    FROM employees
    
    INNER JOIN roles
    ON employees.role_id = roles.id

    INNER JOIN departments
    ON roles.department_id = departments.id

    LEFT JOIN employees e
    ON e.id = employees.manager_id; `

    db.promise().query(sql).then(([rows, fields]) =>{
      console.table(rows)
    }).then(() => {this.mainPrompt()})

    // db.query(sql, (err, rows) => {
    //   if(err){
    //     console.log(err.message)
    //     return
    //   }
    //   console.table(rows)
    // })

  }
}

module.exports = Querys
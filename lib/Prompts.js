const inquirer = require('inquirer')
const Querys = require('./Querys')
const cTable = require('console.table')
const figlet = require('figlet')
// const db = require('../db/connection')





class Prompts {
  constructor(){
    this.Query = new Querys()
  }
 
  welcome(){
    figlet.text('Welcome To \nEmployee Tracker', (err, data) => {
      if(err){
        console.log(err.message)
        return
      }
      // console.log(data)
      this.generateTable()
    })

  }

  generateTable(){
    this.Query.getCompleteTable()
    // const sql = `
    // SELECT employees.id, employees.first_name, employees.last_name, 
    // roles.title, departments.names as departments, roles.salary, 
    // concat(e.first_name, ' ', e.last_name) as manager

    // FROM employees
    
    // INNER JOIN roles
    // ON employees.role_id = roles.id

    // INNER JOIN departments
    // ON roles.department_id = departments.id

    // LEFT JOIN employees e
    // ON e.id = employees.manager_id; `

    // db.promise().query(sql)
    // .then( 
    //   ([rows, fields]) => {
    //     console.table(rows)
    //   }).catch(console.log)
    //     .then(this.mainPrompt()) 
    this.mainPrompt()
  }

  mainPrompt(){
    inquirer
    .prompt({
      type: 'list',
      name: 'mainList',
      message: 'What would you like to do?',
      choices: [
          'View all departments', 
          'View all roles', 
          'View all employees',
          'Add department',
          'Add role',
          'Add employee',
          'Update an employee role'
        ]
      })
      .then((answer) => {
        if(answer.mainList === 'View all departments'){
          this.Query.getDepartments()
          this.mainPrompt()
        } else if(answer.mainList === 'View all roles'){
          this.Query.getRoles()
          this.mainPrompt()
        } else if(answer.mainList === 'View all employees'){
          this.Query.getEmployees()
          this.mainPrompt()
        } else if(answer.mainList === 'Add department'){

        } else if(answer.mainList === 'Add role'){
          
        } else if(answer.mainList === 'Add employee'){
          
        } else if(answer.mainList === 'Update an employee role'){
          
        }
      })
  }
}

module.exports = Prompts
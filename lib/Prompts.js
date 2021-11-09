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
          this.addDepartmentPrompt()

        } else if(answer.mainList === 'Add role'){
          this.addRolePrompts()
          
        } else if(answer.mainList === 'Add employee'){
          this.addEmployeePrompts()
          
        } else if(answer.mainList === 'Update an employee role'){
          
        }
      })
  }

  addDepartmentPrompt(){
    inquirer
    .prompt(
      {
        type: 'input',
        name: 'department',
        message: 'What is the new departments name?',
        validate: depertInput => {
          if(depertInput){
            return true
          }else{
            console.log(`\n Please enter the departments name`)
            return false
            }
          }

      }
    ).then(answer => {
      console.log(answer)
    })

  }

  addRolePrompts(){
    inquirer
    .prompt ([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role',
        validate: titleInput => {
          if(titleInput){
            return true
          }else{
            console.log(`\n Please enter a valid title`)
            return false
          }
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the role (example 150000.00)',
        validate: salaryInput => {
          if(salaryInput){
            return true
          }else{
            console.log(`\n Please enter a valid salary`)
            return false
          }
        }
      },
      {
        type: 'list',
        name: 'department',
        message: 'pick a department for this role',
        choices: [
          'Software development', 
          'Sales', 
          'Production', 
          'Marketing',
          'HR',
          'Accounting',
          'Engineering'
        ]
      }
    ]).then(answers => {
      console.log(answers)
    })
  }

  addEmployeePrompts(){
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Please enter first name of employee',
        validate: input => {
          if(input){
            return true
          }else{
            console.log('please enter a name')
            return true
          }
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Please enter last name of employee',
        validate: input => {
          if(input){
            return true
          }else{
            console.log('please enter a name')
            return true
          }
        }
      },
      {
        type: 'list',
        name: 'role',
        message: 'Please pick a role',
        choices: ['software dev', 'sales', 'marketing']
        
      },
      {
        type: 'list',
        name: 'manger',
        message: 'Please pick a manager',
        choices: ['mark', 'john', 'diana', null]
      },
    ]).then(answers => {
      console.log(answers)
    })

  }

  updateEmployee(){

  }
}

module.exports = Prompts
const inquirer = require('inquirer')
const cTable = require('console.table')
const figlet = require('figlet')
const db = require('../db/connection')
const Querys = require('./Querys')



class Prompts extends Querys{
  constructor(){
    super()

  }
 
  welcome(){
    figlet.text('Welcome To \nEmployee Tracker', (err, data) => {
      if(err){
        console.log(err.message)
        return
      }
      console.log('\n',data)
      this.generateTable()
    })

  }

  generateTable(){
    db.promise().query(this.getCompleteTableSql)
    .then( 
      ([rows, fields]) => {
        console.table('\n',rows)
      }).catch(console.log)
        .then(() => {this.mainPrompt()}) 

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
        this.checkChoiceMainTable(answer)
      })
  }

  checkChoiceMainTable(answer){
    if(answer.mainList === 'View all departments'){
      this.getDepartment()
      this.mainPrompt()
    } else if(answer.mainList === 'View all roles'){
      this.getRoles()
      this.mainPrompt()
    } else if(answer.mainList === 'View all employees'){
      this.getEmployees()
      this.mainPrompt()
    } else if(answer.mainList === 'Add department'){
      this.addDepartmentPrompt()

    } else if(answer.mainList === 'Add role'){
      this.addRolePrompts()
      
    } else if(answer.mainList === 'Add employee'){
      this.addEmployeePrompts()
      
    } else if(answer.mainList === 'Update an employee role'){
      
    }
  }

  getDepartment(){
    db.promise().query(this.getDepartmentsSql)
    .then(([rows, fields]) => {
      console.table('\n',rows)
    })
    .catch(console.log)
    .then( () => {this.mainPrompt()})
  }

  getRoles(){
    db.promise().query(this.getRolesSql)
    .then( ([rows, fields]) => {
      console.table('\n',rows)
    }) 
    .catch(console.log)
    .then(() => {this.mainPrompt()})
  }

  getEmployees(){
    db.promise().query(this.getEmployeesSql)
    .then(([rows, fields]) => {
      console.table('\n', rows)
    })
    .catch(console.log)
    .then( () => {this.mainPrompt()})
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
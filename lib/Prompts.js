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
      this.getDepartments(false)
      this.mainPrompt()
    } else if(answer.mainList === 'View all roles'){
      this.getRoles(false)
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

  getDepartments(getName){

    //set the two sql query calls for getting departments as a variables
    const getNames = this.getDepartmantNamesSql
    const getAll = this.getDepartmentsSql

    //get just the names of the departments for the list in the prompts
    if(getName){
      db.promise().query(getNames)
      .then(([rows, fields]) => {
      })
      .catch(console.log)
      .then( (data) => { return data })
    } //get all the data from the table needed for the table that will be show in the cli
    else {
      db.promise().query(getAll)
      .then(([rows, fields]) => {
        console.table('\n',rows)
      })
      .catch(console.log)
      .then( () => {this.mainPrompt()})
    }
  }

  getRoles(getNames){
    //set the two sql query calls for getting roles as a variables
    const getTitles = this.getRolesTitlesSql
    const getAll = this.getRolesSql

    //get just the titles of the roles for the list in the prompts
    if(getNames){
      db.promise().query(getTitles)
      .then( ([rows, fields]) => {
      })
      .catch(console.log)
      .then( (data) => {return data} )
      
    } //get all the data from the table needed for the table that will be show in the cli
    else{
      db.promise().query(getAll)
      .then( ([rows, fields]) => {
        console.table('\n',rows)
      }) 
      .catch(console.log)
      .then(() => {this.mainPrompt()})
    }

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
      const params = [answer.department]
      db.promise().query(this.createDepartmentSql, params)
      .then(([results, fields]) => {
        console.log('\n', `Department added ${params}`)
      })
      .catch(console.log)
      .then(() => {this.mainPrompt()})
    })

  }

  addRolePrompts(){
    //get array of objects of the titles from roles table
    const list = this.getRoles(true)

    // inquirer
    // .prompt ([
    //   {
    //     type: 'input',
    //     name: 'title',
    //     message: 'What is the title of the role',
    //     validate: titleInput => {
    //       if(titleInput){
    //         return true
    //       }else{
    //         console.log(`\n Please enter a valid title`)
    //         return false
    //       }
    //     }
    //   },
    //   {
    //     type: 'input',
    //     name: 'salary',
    //     message: 'What is the salary for the role (example 150000.00)',
    //     validate: salaryInput => {
    //       if(salaryInput){
    //         return true
    //       }else{
    //         console.log(`\n Please enter a valid salary`)
    //         return false
    //       }
    //     }
    //   },
    //   {
    //     type: 'list',
    //     name: 'department',
    //     message: 'pick a department for this role',
    //     choices: [
    //       'Software development', 
    //       'Sales', 
    //       'Production', 
    //       'Marketing',
    //       'HR',
    //       'Accounting',
    //       'Engineering'
    //     ]
    //   }
    // ]).then(answers => {
    //   console.log(answers)
    // })
  }

  addEmployeePrompts(){
    //get array of objects of the titles from roles and department tables
    const listDepartments = this.getDepartments(true)
    const listRoles = this.getRoles(true)


    // inquirer
    // .prompt([
    //   {
    //     type: 'input',
    //     name: 'firstName',
    //     message: 'Please enter first name of employee',
    //     validate: input => {
    //       if(input){
    //         return true
    //       }else{
    //         console.log('please enter a name')
    //         return true
    //       }
    //     }
    //   },
    //   {
    //     type: 'input',
    //     name: 'lastName',
    //     message: 'Please enter last name of employee',
    //     validate: input => {
    //       if(input){
    //         return true
    //       }else{
    //         console.log('please enter a name')
    //         return true
    //       }
    //     }
    //   },
    //   {
    //     type: 'list',
    //     name: 'role',
    //     message: 'Please pick a role',
    //     choices: ['software dev', 'sales', 'marketing']
        
    //   },
    //   {
    //     type: 'list',
    //     name: 'manger',
    //     message: 'Please pick a manager',
    //     choices: ['mark', 'john', 'diana', null]
    //   },
    // ]).then(answers => {
    //   console.log(answers)
    // })

  }

  updateEmployee(){

  }
}

module.exports = Prompts
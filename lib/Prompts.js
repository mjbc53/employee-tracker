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
    switch(answer.mainList){
      case 'View all departments':
        this.getDepartments(false)
        break;
      case 'View all roles':
        this.getRoles(false)
        break;
      case 'View all employees':
        this.getEmployees()
      case 'Add department':
        this.addDepartmentPrompt()
        break;
      case 'Add role':
        this.addRolePrompts()
        break;
      case 'Add employee':
        this.addEmployeePrompts()
        break;
      case 'Update an employee role':
        break;
    }
  }

  getDepartments(){

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

  getRoles(){
   //get all the data from the table needed for the table that will be show in
   //the cli from the roles table
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
    //sql query to get titles from roles table
    const getDepartmentsNames = this.getDepartmantNamesSql
    //list to hold titles from roles table

    
    
    //get array of objects of the titles from roles table
    db.promise().query(getDepartmentsNames)
      .then( ([rows, fields]) => {
        let roles = rows.map(x => {return Object.values(x)})
        roles = roles.flat()
        return roles
      })
      .catch(console.log)
      .then( data => { 
        //call in inquirer to prompt question about a new role
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
            choices: data
    
          }
        ]).then(answers => {
          
        })
      })


      
   
  }

  addEmployeePrompts(){

    //get array of objects of the titles from roles and department tables
    const listDepartments = this.getDepartments(true)

    console.log(listDepartments, listRoles)


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
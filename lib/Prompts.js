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
    //welcome screen using ASCII art to make the welcome
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
    //generate the main table with infomation from all 3 of the tables being used
    db.promise().query(this.getCompleteTableSql)
    .then( 
      ([rows, fields]) => {
        console.table('\n',rows)
      }).catch(console.log)
        .then(() => {this.mainPrompt()}) 

  }

  mainPrompt(){
    //this is the main prompt that everything will relate back to
    // a list of options on what a user would like to do
    // after a option is choosen then it is passed to the check answer function
    // to determine what to do next
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
    //get answer from main list to pick from. then pass the answer in to the 
    //switch to check which option was pick and then do something from there
    switch(answer.mainList){
      case 'View all departments':
        //get all departments in database
        this.getDepartments(false)
        break;
      case 'View all roles':
        //get all roles in database
        this.getRoles(false)
        break;
      case 'View all employees':
        //get all employees in database
        this.getEmployees()
      case 'Add department':
        //add a department to the database
        this.addDepartmentPrompt()
        break;
      case 'Add role':
        //add a role to the database
        this.addRolePrompts()
        break;
      case 'Add employee':
        //add a employee to the database
        this.addEmployeePrompts()
        break;
      case 'Update an employee role':
        //update and employee's role
        this.updateEmployee()
        break;
    }
  }

  getDepartments(){ 
    //get id and departments from departments table to then print as a table
    //to the console
      db.promise().query(this.getDepartmentsSql)
      .then(([rows, fields]) => {
        console.table('\n',rows)
      })
      .catch(console.log)
      .then( () => {this.mainPrompt()})
    
  }

  getRoles(){
   //get role id, title, salary and related department from roles table to then
   //print as a table to the console
      db.promise().query(this.getRolesSql)
      .then( ([rows, fields]) => {
        console.table('\n',rows)
      }) 
      .catch(console.log)
      .then(() => {this.mainPrompt()})
  }


  getEmployees(){
    //get employees id, first name, last name, manager and role title, salary
    //from employees and roles table to then print as a table to the console
    db.promise().query(this.getEmployeesSql)
    .then(([rows, fields]) => {
      console.table('\n', rows)
    })
    .catch(console.log)
    .then( () => {this.mainPrompt()})
  }


  addDepartmentPrompt(){
    //prompt to ask for new departments name. once name is given then a new
    //department is created
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
    //first query to get names of departments to then pass into the inquirer
    //prompt to use the array of departments as names
    db.promise().query(this.getDepartmantNamesSql)
      .then( ([rows, fields]) => {
        //map out array of objects to get values then flatten out and return array
        let departments = rows.map(x => {return Object.values(x)})
        departments = departments.flat()
        return roles
      })
      .catch(console.log)
      //pass array in to .then and call the inquirer prompts
      .then( listOfDepartments => { 
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
            choices: listOfDepartments
    
          }
        ])
        //after prompts are completed then pass them into a query to get
        //departments id from the departments name then pass that into
        //query that will create the new role
        .then(answers => {
          db.promise().query(this.getDepartmantsId, answers.department)
          .then( ([row, fields]) => {
            return row[0].id
          })
          .catch(console.log)
          .then(departmentId => {
            const params = [answers.title, answers.salary, departmentId ]

            db.promise().query(this.createRoleSql, params)
            .then( ([results, fields])=> {
              console.log(`\n`, `Role added ${answers.title}`)
            })
            .catch(console.log)
            .then(() => this.mainPrompt())
          })
         
        })
      })
  }

  addEmployeePrompts(){
    db.promise().query(this.getRolesTitlesSql)
    .then( ([rows, fields]) => {
      let roles = rows.map(x => {return Object.values(x)})
      roles = roles.flat()
      return roles
    })
    .catch(console.log)
    .then( listOfRoles => {
      db.promise().query(this.getEmployeesNamesSql)
      .then(([rows, fields]) => {
        let names = rows.map(x => {return Object.values(x)})
        names = names.flat()
        return [names, listOfRoles]
      })
      .catch(console.log)
      .then(lists => {
        const [nameslist, rolesList] = lists
          nameslist.push('none')

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
                return false
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
                return false
              }
            }
          },
          {
            type: 'list',
            name: 'role',
            message: 'Please pick a role',
            choices: rolesList
            
          },
          {
            type: 'list',
            name: 'manager',
            message: 'Please pick a manager',
            choices: nameslist
          },
        ]).then(answers => {
          db.promise().query(this.getRolesIdSql, answers.role)
          .then(([row, fields]) => {
            return row[0].id
          })
          .catch(console.log)
          .then(roleId => {
            if(answers.manager === 'none'){
              const params = [answers.firstName, answers.lastName, roleId, null]
              db.promise().query(this.createEmployeeSql, params)
              .then(([results,fields]) => {
                console.log('\n', `Employee ${answers.firstName} ${answers.lastName} has been added `)
              })
              .catch(console.log)
              .then(() => {this.mainPrompt()})
            }else{
              db.promise().query(this.getEmployeesIdSql, answers.manager)
              .then(([row, fields]) => {
                return row[0].id
              })
              .then(managerId => {
                const params = [answers.firstName, answers.lastName, roleId, managerId]
                db.promise().query(this.createEmployeeSql, params)
                .then(([results,fields]) => {
                  console.log('\n', `Employee ${answers.firstName} ${answers.lastName} has been added `)
              })
              .catch(console.log)
              .then(() => {this.mainPrompt()})
              })

            }
            
          })
        })

      })
    })


  }

  updateEmployee(){
    db.promise().query(this.getRolesTitlesSql)
    .then(([rows, fields]) => {
      let roles = rows.map(x => {return Object.values(x)})
      roles = roles.flat()
      return roles
    })
    .catch(console.log)
    .then(listOfRoles => {
      db.promise().query(this.getEmployeesNamesSql)
      .then(([rows, fields]) => {
        let names = rows.map(x => {return Object.values(x)})
        names = names.flat()
        return [names, listOfRoles]
      })
      .catch(console.log)
      .then(lists => {
        const [nameslist, rolesList] = lists
        inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: `Which employee's role would you like to update`,
            choices: nameslist
          },
          {
            type: 'list',
            name: 'role',
            message: `Which role will the employee now have?`,
            choices: rolesList
          }
        ]).then(answers => {
          console.log(answers)
          db.promise().query(this.getRolesIdSql, answers.role)
          .then(([row, fields]) => {
            return row[0].id
          })
          .catch(console.log)
          .then(roleId => {
            db.promise().query(this.getEmployeesIdSql, answers.employee)
            .then(([row, fields]) => {
              return row[0].id
            })
            .then(employeeId => {
              const params = [roleId, employeeId]
              db.promise().query(this.updateEmployeesRoleSql, params)
              .then(([row,fields]) => {
                console.log(row)
                console.log(`\n`, `${answers.employee} now has the ${answers.role} role`)
              })
              .catch(console.log)
              .then(() => {this.mainPrompt()})
            })
          })
        })
      })
    })

  }
}

module.exports = Prompts
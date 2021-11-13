//imports npm packages used, Class Querys And database connection
const inquirer = require('inquirer')
const cTable = require('console.table')
const figlet = require('figlet')
const db = require('../db/connection')
const Querys = require('./Querys')



//Prompts call that extends Querys class to then use sql querys
//for all the this.Sql calls in the db.query calls refer to Querys class
class Prompts extends Querys{
  constructor(){
    super()
  }
 
  //welcome method that will start the prompts
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

  //method that will generate the starting table displaying all the infomation
  //about employees
  generateTable(){
    //generate the main table with infomation from all 3 of the tables being used
    db.promise().query(this.getCompleteTableSql)
    .then( 
      ([rows, fields]) => {
        //console log table of rows pull from database
        console.table('\n',rows)
      }).catch(console.log)
      //then call the main prompt to ask the user what they want to do
        .then(() => {this.mainPrompt()}) 
  }

  //main prompt every method will call this after they are done to then
  //ask the user what they want to do next
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
          'Update an employee role',
          'All done'
        ]
      })
      .then((answer) => {
        //send answer to be checked and then call another method depending on
        //what they want
        this.checkChoiceMainTable(answer)
      })
  }

  //with answer from mainPrompt method then check to see which it matches
  //and call a second method
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
        break;
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
        this.getRoleTitleAndGetEmployeeNames(true)
        break;
      case 'Update an employee role':
        //update and employee's role
        this.getRoleTitleAndGetEmployeeNames(false)
        break;
      case 'All done':
        console.log('\nGoodbye (Ctrl+C to end now)')
        break;
    }
  }

  //query call to get employee names and role titles
  getRoleTitleAndGetEmployeeNames(trueOrFalse){
    //if true then it will pass the anwers to the add employee method
    //if false then if will pass the anwers to update employee method
    
    //get employee names and role titles for add an employee
    if(trueOrFalse){
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
        .then(lists => {this.addEmployeePrompts(lists)})
      })
    }
    //get employee names and role titles for updating an employee
    else{
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
        .then(lists => {this.updateEmployee(lists)})
      })
    }

  }
  //method that will get departments
  getDepartments(){ 
    //get id and departments from departments table to then print as a table
    //to the console
    //once it is complete then recall mainPrompts method
      db.promise().query(this.getDepartmentsSql)
      .then(([rows, fields]) => {
        console.table('\n',rows)
      })
      .catch(console.log)
      .then( () => {this.mainPrompt()})
    
  }

  //method that will get roles
  getRoles(){
   //get role id, title, salary and related department from roles table to then
   //print as a table to the console
   //once it is complete then recall mainPrompts method
      db.promise().query(this.getRolesSql)
      .then( ([rows, fields]) => {
        console.table('\n',rows)
      }) 
      .catch(console.log)
      .then(() => {this.mainPrompt()})
  }

  //method that will get employees
  getEmployees(){
    //get employees id, first name, last name, manager and role title, salary
    //from employees and roles table to then print as a table to the console
    //once it is complete then recall mainPrompts method
    db.promise().query(this.getEmployeesSql)
    .then(([rows, fields]) => {
      console.table('\n', rows)
    })
    .catch(console.log)
    .then( () => {this.mainPrompt()})
  }

  //method that will prompt questions and add a departmet
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
      //take answer and set them as params to pass into the INSERT INTO query
      const params = [answer.department]

      //create a new department query
      db.promise().query(this.createDepartmentSql, params)
      .then(([results, fields]) => {
        //console log the new department that was created
        console.log('\n', `Department added ${params}`)
      })
      .catch(console.log)
      //then call mainPrompt method again
      .then(() => {this.mainPrompt()})
    })

  }

  //method that will prompt questions and add a role
  addRolePrompts(){    
    //first query to get names of departments to then pass into the inquirer
    //prompt to use the array of departments as names
    db.promise().query(this.getDepartmantNamesSql)
      .then( ([rows, fields]) => {
        //map out array of objects to get values then flatten out and return array
        let departments = rows.map(x => {return Object.values(x)})
        departments = departments.flat()
        return departments
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
          //get departments id from departments name
          db.promise().query(this.getDepartmantsId, answers.department)
          .then( ([row, fields]) => {
            return row[0].id
          })
          .catch(console.log)
          .then(departmentId => {
            //with department id now pass all data into a params variable to
            //pass to the query call
            const params = [answers.title, answers.salary, departmentId ]

            //query to make a new role
            db.promise().query(this.createRoleSql, params)
            .then( ([results, fields])=> {
              //console log new role
              console.log(`\n`, `Role added ${answers.title}`)
            })
            .catch(console.log)
            //call mainPrompt method once it is finished
            .then(() => this.mainPrompt())
          })
         
        })
      })
  }

  //method that will prompt questions and add a employee
  addEmployeePrompts(lists){
    //take lists of roles/employee names and deconstruct them
    const [nameslist, rolesList] = lists
    //push 'none' to names list so that way if there is no manager then the
    //answer is none
    nameslist.push('none')

    //call inquirer to prompt questions for adding a new employee
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
    ])
    //pass the answers into the query to get the id of the role by its name and
    //return it
    .then(answers => {
      db.promise().query(this.getRolesIdSql, answers.role)
      .then(([row, fields]) => {
        //return the role id
        return row[0].id
      })
      .catch(console.log)
      //pass in the role id
      .then(roleId => {
        //if the manager prompt was entered none then dont add a manager leave
        //it null
        if(answers.manager === 'none'){
          //set params for creating a new employee with no manager
          const params = [answers.firstName, answers.lastName, roleId, null]
          //create new employee
          db.promise().query(this.createEmployeeSql, params)
          .then(([results,fields]) => {
            console.log('\n', `Employee ${answers.firstName} ${answers.lastName} has been added `)
          })
          .catch(console.log)
          //once created then call main prompt again
          .then(() => {this.mainPrompt()})
        }else{
          //if there was a manager then create a employee with a manager
          //get managers employee id
          db.promise().query(this.getEmployeesIdSql, answers.manager)
          .then(([row, fields]) => {
            //return id
            return row[0].id
          })
          //then pass manager id into new function
          .then(managerId => {
            //set params for creating a new employee with a manager
            const params = [answers.firstName, answers.lastName, roleId, managerId]
            //create new employee
            db.promise().query(this.createEmployeeSql, params)
            .then(([results,fields]) => {
              console.log('\n', `Employee ${answers.firstName} ${answers.lastName} has been added `)
          })
          .catch(console.log)
            //once created then call main prompt again
          .then(() => {this.mainPrompt()})
          })

        }
        
      })
    })
  }

  //method that will prompt questions and update an employee
  updateEmployee(lists){
    //take lists of roles/employee names and deconstruct them
    const [nameslist, rolesList] = lists
    
    //call inquirer prompts for updating an employee
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
    ])
    //pass the answers into the query to get the id of the role by its name and
    //return it
    .then(answers => {
      //get role id
      db.promise().query(this.getRolesIdSql, answers.role)
      .then(([row, fields]) => {
        //return role id
        return row[0].id
      })
      .catch(console.log)
      //take answers and get employee id and return it
      .then(roleId => {
        //get employee id
        db.promise().query(this.getEmployeesIdSql, answers.employee)
        .then(([row, fields]) => {
          //return employee id
          return row[0].id
        })
        .then(employeeId => {
          //take both ids that where passed in and set them to the params
          const params = [roleId, employeeId]
          //update employee with a new role
          db.promise().query(this.updateEmployeesRoleSql, params)
          .then(([row,fields]) => {
            console.log(`\n`, `${answers.employee} now has the ${answers.role} role`)
          })
          .catch(console.log)
          //then call main prompt
          .then(() => {this.mainPrompt()})
        })
      })
    })
  }
}

module.exports = Prompts
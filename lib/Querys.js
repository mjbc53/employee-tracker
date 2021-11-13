class Querys{
  constructor(){
    //get complete table to display when prompts are first started
    this.getCompleteTableSql =  `
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

    // 
    // 
    // 

    //get roles, id, title, salary, inner join department names query
    this.getRolesSql = `SELECT roles.id, roles.title, roles.salary, 
    departments.names as department

    FROM roles
    
    INNER JOIN departments
    ON roles.department_id = departments.id;` 

    //create a role with a insert into query with placeholders for values
    this.createRoleSql = 
    `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?)`

    //get just the role titles query
    this.getRolesTitlesSql = `SELECT roles.title FROM roles;`

    //get the role id where the role titles are the same query
    this.getRolesIdSql = `SELECT roles.id FROM roles 
    WHERE title = ?`


    // 
    // 
    // 

    //get employees id, first_name, last_name, 
    //inner join roles title, salary
    //self join managers
    this.getEmployeesSql = `
    SELECT  employees.id, employees.first_name, 
    employees.last_name, roles.title, roles.salary, 
    concat( e.first_name, ' ', e.last_name) as manager
    
    FROM employees
    
    INNER JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN employees e
    ON e.id = employees.manager_id
    `

    //get employees names concat to get full name query
    this.getEmployeesNamesSql =`
    SELECT CONCAT(employees.first_name, ' ', employees.last_name) 
    FROM employees`

    //create employee with insert into query. values with placeholders
    this.createEmployeeSql =`
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`

    //get employees id where the concated name is the same query
    this.getEmployeesIdSql = `
    SELECT employees.id 
    FROM employees 
    WHERE CONCAT(employees.first_name, " ", employees.last_name ) = ?`
  
    //update employees role where employee id is the same query
    this.updateEmployeesRoleSql = `
    UPDATE employees 
    SET role_id = ?
    WHERE id = ?`

    // 
    // 
    // 

    //get all of departments table query
    this.getDepartmentsSql = `SELECT * FROM departments`

    //get departments names query
    this.getDepartmantNamesSql = 'SELECT departments.names FROM departments'

    //create a department with insert into query. values with placeholder
    this.createDepartmentSql = `INSERT INTO departments (names)
    VALUES (?)`
    
    //get departments id where the names are the same query
    this.getDepartmantsId = `SELECT * from departments where names = ?`
  }
}

module.exports = Querys
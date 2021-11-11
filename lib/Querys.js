class Querys{
  constructor(){
    this.getRolesSql = `SELECT roles.id, roles.title, roles.salary, 
    departments.names as department

    FROM roles
    
    INNER JOIN departments
    ON roles.department_id = departments.id;` 

    this.getRolesTitlesSql = `SELECT roles.title FROM roles;`

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

    this.getDepartmentsSql = `SELECT * FROM departments`

    this.getDepartmantNamesSql = 'SELECT departments.names FROM departments'

    this.createDepartmentSql = `INSERT INTO departments (names)
    VALUES (?)`
  }
  
}

module.exports = Querys
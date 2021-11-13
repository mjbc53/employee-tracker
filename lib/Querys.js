class Querys{
  constructor(){
    this.getRolesSql = `SELECT roles.id, roles.title, roles.salary, 
    departments.names as department

    FROM roles
    
    INNER JOIN departments
    ON roles.department_id = departments.id;` 

    this.getRolesTitlesSql = `SELECT roles.title FROM roles;`

    this.createRoleSql = 
    `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?)`

    this.getRolesIdSql = `SELECT roles.id FROM roles 
    WHERE title = ?`

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

    this.getEmployeesNamesSql =`
    SELECT CONCAT(employees.first_name, ' ', employees.last_name) 
    FROM employees`

    this.createEmployeeSql =`
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)
    `
    this.getEmployeesIdSql = `
    SELECT employees.id 
    FROM employees 
    WHERE CONCAT(employees.first_name, " ", employees.last_name ) = ?`

    this.getDepartmentsSql = `SELECT * FROM departments`

    this.getDepartmantNamesSql = 'SELECT departments.names FROM departments'

    this.createDepartmentSql = `INSERT INTO departments (names)
    VALUES (?)`
    
    this.getDepartmantsId = `SELECT * from departments where names = ?`
  }
}

module.exports = Querys
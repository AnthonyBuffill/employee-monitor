const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'company_db', // Add the database name here
}); 

function viewAllDepartments() {
  // Query to get all departments
  const query = 'SELECT * FROM department';
  db.query(query, (err, departments) => {
    if (err) throw err;
    console.table(departments);
    startApp();
  });
}

function viewAllRoles() {
  // Query to get all roles with department information
  const query = 'SELECT role.id, title, salary, department.name AS department FROM role JOIN department ON role.department_ID = department.id';
  db.query(query, (err, roles) => {
    if (err) throw err;
    console.table(roles);
    startApp();
  });
}

function viewAllEmployees() {
  // Query to get all employees with role, department, and manager information
  const query = 'SELECT employee.id, first_name, last_name, title, department.name AS department, salary, manager_ID FROM employee JOIN role ON employee.role_ID = role.id JOIN department ON role.department_ID = department.id';
  db.query(query, (err, employees) => {
    if (err) throw err;
    console.table(employees);
    startApp();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter the name of the department:',
        name: 'departmentName',
      },
    ])
    .then((answers) => {
      // Query to add a new department
      const query = 'INSERT INTO department (name) VALUES (?)';
      db.query(query, [answers.departmentName], (err) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
}

function addRole() {
  // Query to get department names for choices
  const departmentQuery = 'SELECT * FROM department';
  db.query(departmentQuery, (err, departments) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter the name of the role:',
          name: 'roleName',
        },
        {
          type: 'input',
          message: 'Enter the salary for the role:',
          name: 'roleSalary',
        },
        {
          type: 'list',
          message: 'Choose the department for the role:',
          name: 'departmentID',
          choices: departments.map((department) => ({ name: department.name, value: department.id })),
        },
      ])
      .then((answers) => {
        // Query to add a new role
        const query = 'INSERT INTO role (title, salary, department_ID) VALUES (?, ?, ?)';
        db.query(query, [answers.roleName, answers.roleSalary, answers.departmentID], (err) => {
          if (err) throw err;
          console.info('Role added successfully!');
          startApp();
        });
      });
  });
}

function addEmployee() {
  // Query to get role names for choices
  const roleQuery = 'SELECT * FROM role';
  db.query(roleQuery, (err, roles) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter the first name of the employee:',
          name: 'firstName',
        },
        {
          type: 'input',
          message: 'Enter the last name of the employee:',
          name: 'lastName',
        },
        {
          type: 'list',
          message: 'Choose the role for the employee:',
          name: 'roleID',
          choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
        {
          type: 'input',
          message: 'Enter the manager ID for the employee (if applicable):',
          name: 'managerID',
        },
      ])
      .then((answers) => {
        // Query to add a new employee
        const query = 'INSERT INTO employee (first_name, last_name, role_ID, manager_ID) VALUES (?, ?, ?, ?)';
        db.query(query, [answers.firstName, answers.lastName, answers.roleID, answers.managerID], (err) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          startApp();
        });
      });
  });
}

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please choose from the following options:',
        name: 'options',
        choices: [
          'view all departments',
          'view all roles',
          'view all employees',
          'add a department',
          'add a role',
          'add an employee',
          'update an employee role',
          'exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.options) {
        case 'view all departments':
          viewAllDepartments();
          break;
        case 'view all roles':
          viewAllRoles();
          break;
        case 'view all employees':
          viewAllEmployees();
          break;
        case 'add a department':
          addDepartment();
          break;
        case 'add a role':
          addRole();
          break;
        case 'add an employee':
          addEmployee();
          break;
        case 'exit':
          console.info('Exiting the application. Goodbye!');
          process.exit(0);
          break;
        default:
          console.error('Invalid option. Please try again.');
          startApp();
      }
    });
}

// Initial call to start the application
startApp();

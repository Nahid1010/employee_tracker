// add function for all tables
const inquirer = require('inquirer');

const addRec = (connection, action, table) => {
  switch(table) {
      case "Employee":
        // get all managers - so we can select one manager for the new employee
        connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS manager FROM employee where manager_id is NULL ORDER BY id", (err, res) => {
          if (err) throw err;
          let managers = [];

          managers.push('0:None');
          for(i=1; i<res.length; i++) {
            managers.push(res[i].manager);
          }
          // get all roles so we can select one for the employee
          connection.query("SELECT CONCAT(id,':',title) AS title FROM role ORDER BY id", (err1, res1) => {
            if (err1) throw err1;
            let roles = [];

            for(i=0; i<res1.length; i++) {
              roles.push(res1[i].title);
            } 
            // prompt user for input data
            inquirer.prompt(
              questions = [{
                type: "input",
                name: "first",
                message: "Please enter employee first name: "
              },
              {
                type: "input",
                name: "last",
                message: "Please enter employee last name: "
              },
              {
                type: "list",
                name: "role_id",
                message: "Please select role: ",
                choices: roles
              },
              {
                type: "list",
                name: "manager_id",
                message: "Please select manager: ",
                choices: managers
              }]
            )
            // add new employee to table once we have all data 
            .then((data) => {
              let manager_id = data.manager_id.split(':')[0];
              if (manager_id === '0') {
                query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${data.first}', '${data.last}', ${data.role_id.split(':')[0]})`;
              }
              else {
                query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.first}', '${data.last}', ${data.role_id.split(':')[0]}, ${manager_id})`;
              }              
              // console.log(query);
              connection.query(query, (err2, res2) => {
                if (err2) throw err2;
                const viewTable = require('./viewTable');
                // display data once we have added new employee
                viewTable(connection, "Add", "Employee");
              });
            });
          });
        });
        break;
      case "Role":
        // get all department so we can select one for the new role
        connection.query("SELECT CONCAT(id,':',name) AS ID_NAME FROM department ORDER BY id", (err, res) => {
          if (err) throw err;
          let depts = [];
          
          for(i=0; i<res.length; i++) {
            depts.push(res[i].ID_NAME);
          }
          // prompt user for input data
          inquirer.prompt(
            questions = [{
              type: "input",
              name: "title",
              message: "Please enter Role name: "
            },
            {
              type: "input",
              name: "salary",
              message: "Please enter Role salary: "
            },
            {
              type: "list",
              name: "dept_id",
              message: "Please select department: ",
              choices: depts
            }]
          )
          // add role to table once we have all data
          .then((data) => {
            query = `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', ${data.salary}, ${data.dept_id.split(':')[0]})`;
            // console.log(query);
            connection.query(query, (err1, res1) => {
              if (err1) throw err1;
              // display data once we have added new role
              const viewTable = require('./viewTable');
              viewTable(connection, "Add", "Role");
            });
          }); 
        });     
        break;
      case "Department":
          // prompt user for input data
          inquirer.prompt(
            questions = [{
              type: "input",
              name: "dept_name",
              message: "Please enter name of Department: "
            }]
          )
          .then((data) => {
            query = `INSERT INTO department (name) VALUES ('${data.dept_name}')`;
            connection.query(query, (err, res) => {
              if (err) throw err;
              const viewTable = require('./viewTable');
              // display data once we have added new department
              viewTable(connection, "Add", "Department");
            });
          });
          break;
  }
}
// export 
module.exports = addRec;
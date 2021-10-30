// add function for all tables
const inquirer = require('inquirer');

const updateEmployeeManager = (connection) => {
  // get all employees to select one
  connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS empl FROM employee where manager_id is not NULL ORDER BY id", (err, res) => {
    if (err) throw err;
    let employees = [];

    for(i=0; i<res.length; i++) {
      employees.push(res[i].empl);
    }
    // prompt user to select one
    inquirer.prompt(
      questions = [{
        type: "list",
        name: "empl_id",
        message: "Please select employee to update his manager: ",
        choices: employees
      }]
    )
    .then((data) => {
      const employee_id = data.empl_id.split(':')[0];
      const employee_name = data.empl_id.split(':')[1];
      // get current manager's name
      connection.query(`SELECT CONCAT(first_name, ' ', last_name) AS manager FROM employee where id in (SELECT manager_id FROM employee where id = ${employee_id})`, (err1, res1) => {
        if (err1) throw err1;
        console.log(`${employee_name}'s current Manager is ${res1[0].manager}`);
        // get all managers to select one as new manager
        connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS manager FROM employee where manager_id is NULL ORDER BY id", (err2, res2) => {
          if (err2) throw err2;
          let managers = [];
      
          for(i=0; i<res2.length; i++) {
            managers.push(res2[i].manager);
          }
          // prompt user to select one as new manager
          inquirer.prompt(
            questions = [{
              type: "list",
              name: "mgr_id",
              message: "Please select new manager: ",
              choices: managers
            }]
          )
          .then((data) => {
            const manager_id = data.mgr_id.split(':')[0];
            const manager_name = data.mgr_id.split(':')[1];
            // update employee with the new manager
            query = `UPDATE employee SET manager_id = ${manager_id} where id = ${employee_id}`;
            connection.query(query, (err3, res3) => {
              if (err3) throw err3;
              // display all employees for this manager to show that employee is now under this manager
              query = `SELECT e.first_name, e.last_name, title, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee as e LEFT JOIN employee AS m ON m.id = e.manager_id LEFT JOIN role as r on e.role_id = r.id WHERE e.manager_id = ${manager_id}`;
              connection.query(query, (err4, res4) => {
                const bonus = require('./bonus');
                if (err4) throw err4;
                console.log(`Employee List for: ${manager_name}`);
                console.table(res4);
                bonus(connection);
              });
            });
          });
        });
      });
    });
  });
}

// export 
module.exports = updateEmployeeManager;
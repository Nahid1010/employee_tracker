// add function for all tables
const inquirer = require('inquirer');

const updateEmployeeRole = (connection) => {
  // get all employees to select one
  connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS empl FROM employee where manager_id is not NULL ORDER BY id", (err, res) => {
    if (err) throw err;
    let employees = [];

    for(i=0; i<res.length; i++) {
      employees.push(res[i].empl);
    }
    // prompt user to select one employee
    inquirer.prompt(
      questions = [{
        type: "list",
        name: "empl_id",
        message: "Please select employee to update his role: ",
        choices: employees
      }]
    )
    .then((data) => {
      const employee_id = data.empl_id.split(':')[0];
      const employee_name = data.empl_id.split(':')[1];
      // get all roles so user can select one
      connection.query("SELECT CONCAT(id,':',title) AS title FROM role ORDER BY id", (err1, res1) => {
        if (err1) throw err1;
        let roles = [];

        for(i=0; i<res1.length; i++) {
          roles.push(res1[i].title);
        } 
        // prompt user to select a role
        inquirer.prompt(
          questions = [{
            type: "list",
            name: "role_id",
            message: "Please select role: ",
            choices: roles
          }]
        )
        .then((data) => {
          const role_id = data.role_id.split(':')[0];
          const role_name = data.role_id.split(':')[1];
          // get employees previous role
          query = `select title from role where id = ${role_id}`;
          connection.query(query, (err2, res2) => {
            if (err1) throw err1;
            console.log(`${employee_name}'s previous role: ${res2[0].title}`);

            // now update his role with newly selected role
            query = `UPDATE employee SET role_id = ${role_id} where id = ${employee_id}`;
            connection.query(query, (err3, res3) => {
              if (err3) throw err3;
              // display data for this employee to show that role has been updated
              query = `SELECT e.first_name, e.last_name, title, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee as e LEFT JOIN employee AS m ON m.id = e.manager_id LEFT JOIN role as r on e.role_id = r.id WHERE e.id = ${employee_id}`;
              connection.query(query, (err4, res4) => {
                const bonus = require('./bonus');
                if (err4) throw err4;
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
module.exports = updateEmployeeRole;
// add function for all tables
const inquirer = require('inquirer');

const viewEmployeeByManager = (connection) => {
  // get all managers
  connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS manager FROM employee where manager_id is NULL ORDER BY id", (err, res) => {
    if (err) throw err;
    let managers = [];
    
    for(i=0; i<res.length; i++) {
      managers.push(res[i].manager);
    }
    // prompt to select one manager
    inquirer.prompt(
      questions = [{
        type: "list",
        name: "manager_id",
        message: "Please select manager to see his employees: ",
        choices: managers
      }]
    )
    .then((data) => {
      // display all employees under this manager
      query = `SELECT first_name, last_name, title, salary FROM employee as e LEFT JOIN role as r on e.role_id = r.id WHERE manager_id = ${data.manager_id.split(':')[0]}`;
      connection.query(query, (err1, res1) => {
        const bonus = require('./bonus');
        if (err1) throw err1;
        // console.log(res1[0].budget);
        console.log(`Employee List for: ${data.manager_id.split(':')[1]}`);
        console.table(res1);
        bonus(connection);
      });
    });

  });
}

// export 
module.exports = viewEmployeeByManager;
// bonus menu functions
const inquirer = require('inquirer');
const actions = require('./actions');

const bonus = (connection) => {
  inquirer.prompt(
      // bonus menu items
      questions = [{
          type: "list",
          name: "selection",
          message: `Please select bonus menu option: `,
          choices: ["Update Employee Role", "Update Employee Manager", "View Employees by Manager", "Department Budget", "Return to Main"]
        }]        
  )
  .then((data) => {
      // console.log(action);
      const main = require('./main');
    //   console.log(data.selection);
      switch(data.selection) {
          case "Return to Main":
              main(connection);
              break;
          default:
              actions(connection, data.selection, '');
              break;
      };
  });
}

// export 
module.exports = bonus;
// actions
const viewTable = require('./viewTable');
const addRec = require('./addRec');
const delRec = require('./delRec');
const departmentBudget = require('./departmentBudget');
const viewEmployeeByManager = require('./viewEmployeeByManager');
const updateEmployeeManager = require('./updateEmployeeManager');
const updateEmployeeRole = require('./updateEmployeeRole');

// all these actions are based on whatever menu item user chose
const actions = (connection, action, table) => {
    // console.log(action);
    switch(action) {
        case "View":
            viewTable(connection, action, table);
            break;
        case "Add":
            addRec(connection, action, table);
            break;
        case "Delete":
            delRec(connection, action, table);
            break;
        case "Update Employee Role":
            updateEmployeeRole(connection, action, table);
            break;
        case "Update Employee Manager":
            updateEmployeeManager(connection, action, table);
            break;
        case "View Employees by Manager":
            viewEmployeeByManager(connection, action, table);
            break;
        case "Department Budget":
            departmentBudget(connection);
            break;
        }
}

// export 
module.exports = actions;
// view function for all tables
const viewTable = (connection, action, table) => {
    // form the query based on menu selection
    switch(table) {
        case "Employee":
            // get employee data left join with employee to get Manager's name, left join role to get title and left join department to get department name
            query = "SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON m.id = e.manager_id LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id ORDER BY e.id";
            break;
        case "Role":
            // get all roles left join department to get department name
            query = "SELECT r.id, title, salary, name AS department FROM role AS r LEFT JOIN department AS d on r.department_id = d.id ORDER BY r.id";
            break;
        case "Department": 
            // get all departments
            query = "SELECT id, name AS department FROM department ORDER BY id";
            break;
    }
    // execute query, display data and show submenu in context
    connection.query(query, (err, res) => {
      const subMenu = require('./subMenu');
      if (err) throw err;
      console.log("");
      console.table(res);
      subMenu(connection, action);
    });
  }
  // export 
  module.exports = viewTable;
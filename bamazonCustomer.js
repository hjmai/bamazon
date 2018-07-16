var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
});

var displayItems = function() {
    connection.query(
        "SELECT * FROM products",
        function(err, res){
            for(var i = 0; i < res.length; i++){
                console.log(res[i].id + ") " + res[i].product_name + 
                "\nPrice: $" + res[i].price + 
                "\nStock: " + res[i].stock_quantity + 
                "\nDepartment: " + res[i].department_name + 
                "\n----------------------------\n");
            }
        }
    )
}

var promptQuestion = function() {
    inquirer.prompt([
        {
            message: 'What is the id of the item you would like to buy?',
            type: 'input',
            name: 'itemId'
        },
        {
            message: 'How many would you like to buy?',
            type: 'input',
            name: 'quantity'
        }
    ]).then(ans => {
        console.log(ans.quantity);
    })
}

connection.connect(function(err){
    if(err) throw err;
    displayItems();
    promptQuestion();
})

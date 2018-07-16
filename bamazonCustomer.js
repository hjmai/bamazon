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
            if (err) throw err;
            for(var i = 0; i < res.length; i++){
                console.log(res[i].id + ") " + res[i].product_name + 
                "\nPrice: $" + res[i].price + 
                "\nStock: " + res[i].stock_quantity + 
                "\nDepartment: " + res[i].department_name + 
                "\n----------------------------\n");
            }
            promptId(res);
        }
    )
}

var promptId = function(inventory) {
    inquirer.prompt([
        {
            message: 'What is the id of the item you would like to buy?',
            type: 'input',
            name: 'itemId',
            validate: function(ans) {
                return !isNaN(ans);
            }
        },
    ]).then(ans => {
        promptQuantity(ans.itemId, inventory);
    })
}

var promptQuantity = function(itemId, inventory) {
    inquirer.prompt([
        {
            message: "How many do you wish to buy?",
            type: "input",
            name: "quantity",
            validate: function(ans) {
                return !isNaN(ans);
            }
        },
    ]).then(ans => {
        if(ans.quantity > inventory[itemId-1].stock_quantity){
            console.log("We do not have enough in stock!");
            promptQuantity(itemId, inventory);
        }
        else{
            updateTable(ans.quantity, inventory[itemId-1]);
        }
    })
}

var updateTable = function(amount, inventory) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
        [amount, inventory.id],
        function(err, res) {
          // Let the user know the purchase was successful, re-run loadProducts
          console.log("\nSuccessfully purchased " + amount + " " + inventory.product_name + "'s!\n");
          displayItems();
        });
}

connection.connect(function(err){
    if(err) throw err;
    displayItems();
})

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10, 4) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony A7II", "Photography", 1499.99, 10), ("Canon 5D Mark IV", "Photography", 2499.99, 10), ("Phantom Mk3", "Photography", 1399.99, 5), ("GoPro Hero 5", "Adventure Gear", 449.99, 25), ("Karma Grip", "Adventure Gear", 299.99, 10), ("iPhone X", "Cellular Device", 799.99, 15), ("Pixel 2", "Cellular Device", 799.99, 15), ("Nintendo Switch", "Video Games", 299.99, 20), ("Xbox One", "Video Games", 349.99, 10), ("Playstation 4", "Video Games", 349.99, 10);

SELECT * FROM products;
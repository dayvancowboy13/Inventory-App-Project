exports.INIT = `CREATE TABLE IF NOT EXISTS manufacturers(
manufacturer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
manu_name VARCHAR(30),
location VARCHAR(30),
notes VARCHAR(200));

CREATE TABLE IF NOT EXISTS categories(
category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
cat_name VARCHAR(30),
description VARCHAR(200));

CREATE TABLE IF NOT EXISTS items(
item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
item_name VARCHAR(30),
description VARCHAR(200),
manufacturer_id INT, CONSTRAINT fk_manufacturer FOREIGN KEY (manufacturer_id) 
REFERENCES manufacturers(manufacturer_id),
category_id INT, CONSTRAINT fk_category FOREIGN KEY (category_id)
REFERENCES categories(category_id),
price INT,
quantity INT,
image VARCHAR(22));
`;

exports.DUMMY_ITEMS = `INSERT INTO items (item_name, description, manufacturer_id, 
category_id, price, quantity, image) VALUES
('item1','desc1',1,1,10,2,'image1.jpg'),
('item2','desc2',2,2,10,2,'image2.jpg'),
('item3','desc3',3,3,10,2,'image3.jpg'),
('item4','desc4',4,4,10,2,'image4.jpg');`;

exports.DUMMY_MANU = `INSERT INTO manufacturers (manu_name, location, notes) VALUES
('man1','loc1', 'blah blah blah blah blah'),
('man2','loc2', 'blah blah blah blah blah'),
('man3','loc3', 'blah blah blah blah blah'),
('man4','loc4', 'blah blah blah blah blah'),
('man4','loc4', 'blah blah blah blah blah');`;

exports.DUMMY_CATS = `INSERT INTO categories (cat_name, description) VALUES
('cat1','blah blah blah blah blah'),
('cat2','blah blah blah blah blah'),
('cat3','blah blah blah blah blah'),
('cat4','blah blah blah blah blah');`;
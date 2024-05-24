const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/bike_shop.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login_cd TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        name TEXT NOT NULL,
        phone INTEGER NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        content TEXT,
        send_date TEXT,
        name TEXT,
        email TEXT,
        phone TEXT
        FOREIGN KEY (user_id) REFERENCES user(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        publish_from DATE,
        publish_to DATE,
        image_src TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type INTEGER,
        description TEXT,
        stock INTEGER,
        price REAL,
        engine INTEGER,
        keyword TEXT,
        image_src TEXT

    )`);

    // Insert test data into user table
    db.run(`INSERT INTO user (login_cd, password, email, name, phone) VALUES
        ('admin', 'admin', 'admin@example.com', 'Admin', 1234567890)
    `);

    // Insert test data into contact table
    db.run(`INSERT INTO contact (user_id, title, content, send_date) VALUES
        (1, 'Test drive request', 'I want to take a test drive next sunday', '2024-05-01', 'test', 'test@gmail.com', '1234567898'),
        (1, 'Test drive request', 'I want to test drive the new bike', '2024-05-02', 'phong', 'phong@gmail.com' ,'1234567828')
    `);

    // Insert test data into news table
    db.run(`INSERT INTO news (title, content, publish_from, publish_to) VALUES
        ('Moto GP result 2024', 'The winner this year is Peter from Kawasaki', '2024-05-01', '2024-05-10', 'images/news1.jpg'),
        ('How to choose your first bike', 'Some content about choosing bikes', '2024-05-05', '2024-05-15', 'images/news1.jpg'),
        ('Top 10 location for a day out', 'Detail location information', '2024-05-05', '2024-05-20', 'images/news1.jpg')
    `);

    // Insert test data into product table
    db.run(`INSERT INTO product (name, type, description, stock, price, engine, keyword) VALUES
        ('Motorcycle 1', 1, 'Description of product 1', 50, 16000, 900, 'bike, green, black, sport', 'images/product1.jpg' ),
        ('Motorcycle 2', 1, 'Description of product 2', 20, 12000, 750, 'bike, black, sport', 'images/product2.jpg' ),
        ('Motorcycle 3', 1, 'Description of product 3', 0, 60000, 1000, 'bike, black, classic', 'images/product3.jpg' ),
        ('Motorcycle 4', 1, 'Description of product 4', 10, 31000, 950, 'bike, black, street, sport', 'images/product4.jpg' ),
        ('Motorcycle 5', 1, 'Description of product 5', 30, 32000, 850, 'bike, black, classic, cruiser', 'images/product5.jpg' ),
        ('Motorcycle 6', 1, 'Description of product 6', 100, 22000, 700, 'bike, black, classic, bobber', 'images/product6.jpg' ),
        ('Motorcycle 7', 1, 'Description of product 7', 50, 12300, 500, 'bike, black, classic, cruiser', 'images/product7.jpg' ),
        ('Motorcycle 8', 1, 'Description of product 8', 200, 15000, 450, 'bike, black, dirt bike', 'images/product8.jpg' ),
        ('Motorcycle 9', 1, 'Description of product 9', 140, 8000, 250, 'bike, black, sport touring', 'images/product9.jpg' ),
        ('Motorcycle 10', 1, 'Description of product 10', 100, 11000, 660, 'bike, black, classic','images/product10.jpg' ),
        ('Jacket A', 2, 'Bike Jacket for men', 300, 300, NULL, 'men jacket, fashion, black, grey', 'images/product11.jpg' ),
        ('Jacket B', 2, 'Women Jacket with style', 300, 400, NULL, 'women jacket, fashion, pink, white, blue, purple', 'images/product12.jpg' ),
        ('Jacket C', 2, 'Kid Jacket', 300, 200, NULL, 'kid jacket, fashion, pink, white, black', 'images/product13.jpg' ),
        ('Jacket D', 2, 'Windproof jacket', 300, 200, NULL, 'men women kid jacket, fashion, pink, black, grey', 'images/product14.jpg' )
    `);
});

db.close();

const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite3 database
const db = new sqlite3.Database('./db/bike_shop.db');

// Serialize to ensure queries run sequentially
db.serialize(() => {
    // Add a new column 'image_src' to the 'news' table
    // db.run(`ALTER TABLE product ADD COLUMN other_image_src TEXT`, (err) => {
    //     if (err) {
    //         console.error('Error adding new column:', err.message);
    //     } else {
    //         console.log('Column image_src added successfully.');
    //     }
    // });
    db.run(`DELETE FROM user `);

//     db.run(`DROP TABLE IF EXISTS product `);
//     db.run(`CREATE TABLE IF NOT EXISTS product (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         type INTEGER,
//         description TEXT,
//         stock INTEGER,
//         price REAL,
//         engine INTEGER,
//         keyword TEXT,
//         image_src TEXT,
//         other_image_src TEXT

//     )`);
//     db.run(`INSERT INTO product (name, type, description, stock, price, engine, keyword, image_src) VALUES
//     ('Motorcycle 1', 1, 'Description of product 1', 50, 16000, 900, 'bike, green, black, sport', 'images/product1.jpg' ),
//     ('Motorcycle 2', 1, 'Description of product 2', 20, 12000, 750, 'bike, black, sport', 'images/product2.jpg' ),
//     ('Motorcycle 3', 1, 'Description of product 3', 0, 60000, 1000, 'bike, black, classic', 'images/product3.jpg' ),
//     ('Motorcycle 4', 1, 'Description of product 4', 10, 31000, 950, 'bike, black, street, sport', 'images/product4.jpg' ),
//     ('Motorcycle 5', 1, 'Description of product 5', 30, 32000, 850, 'bike, black, classic, cruiser', 'images/product5.jpg' ),
//     ('Motorcycle 6', 1, 'Description of product 6', 100, 22000, 700, 'bike, black, classic, bobber', 'images/product6.jpg' ),
//     ('Motorcycle 7', 1, 'Description of product 7', 50, 12300, 500, 'bike, black, classic, cruiser', 'images/product7.jpg' ),
//     ('Motorcycle 8', 1, 'Description of product 8', 200, 15000, 450, 'bike, black, dirt bike', 'images/product8.jpg' ),
//     ('Motorcycle 9', 1, 'Description of product 9', 140, 8000, 250, 'bike, black, sport touring', 'images/product9.jpg' ),
//     ('Motorcycle 10', 1, 'Description of product 10', 100, 11000, 660, 'bike, black, classic','images/product10.jpg' ),
//     ('Jacket A', 2, 'Bike Jacket for men', 300, 300, NULL, 'men jacket, fashion, black, grey', 'images/product11.jpg' ),
//     ('Jacket B', 2, 'Women Jacket with style', 300, 400, NULL, 'women jacket, fashion, pink, white, blue, purple', 'images/product12.jpg' ),
//     ('Jacket C', 2, 'Kid Jacket', 300, 200, NULL, 'kid jacket, fashion, pink, white, black', 'images/product13.jpg' ),
//     ('Jacket D', 2, 'Windproof jacket', 300, 200, NULL, 'men women kid jacket, fashion, pink, black, grey', 'images/product14.jpg' )
// `);

    // const updates = [
    //     // { id: 1, other_image_src: "/images/product1.jpg__/images/product10.jpg__/images/product9.jpg__/images/product8.jpg" },
    //     // { id: 2, other_image_src: "/images/product2.jpg__/images/product9.jpg__/images/product8.jpg__/images/product7.jpg" },
    //     // { id: 3, other_image_src: "/images/product3.jpg__/images/product8.jpg__/images/product7.jpg__/images/product6.jpg" },
    //     // { id: 4, other_image_src: "/images/product4.jpg__/images/product7.jpg__/images/product6.jpg__/images/product5.jpg" },
    //     // { id: 5, other_image_src: "/images/product5.jpg__/images/product6.jpg__/images/product5.jpg__/images/product4.jpg" },
    //     // { id: 6, other_image_src: "/images/product6.jpg__/images/product5.jpg__/images/product4.jpg__/images/product3.jpg" },
    //     // { id: 7, other_image_src: "/images/product7.jpg__/images/product4.jpg__/images/product3.jpg__/images/product2.jpg" },
    //     // { id: 8, other_image_src: "/images/product8.jpg__/images/product3.jpg__/images/product2.jpg__/images/product1.jpg" },
    //     // { id: 9, other_image_src: "/images/product9.jpg__/images/product2.jpg__/images/product1.jpg__/images/product10.jpg" },
    //     // { id: 10,other_image_src: "/images/product10.jpg__/images/product1.jpg__/images/product9.jpg__/images/product8.jpg" },
    //     // { id: 11,other_image_src: "" },
    //     // { id: 12,other_image_src: "" },
    //     // { id: 13,other_image_src: "" },
    //     // { id: 14,other_image_src: "" },
    //     { id: 1, other_image_src: "/images/product1.jpg" },
    //     { id: 2, other_image_src: "/images/product2.jpg" },
    //     { id: 3, other_image_src: "/images/product3.jpg" },
    //     { id: 4, other_image_src: "/images/product4.jpg" },
    //     { id: 5, other_image_src: "/images/product5.jpg" },
    //     { id: 6, other_image_src: "/images/product6.jpg" },
    //     { id: 7, other_image_src: "/images/product7.jpg" },
    //     { id: 8, other_image_src: "/images/product8.jpg" },
    //     { id: 9, other_image_src: "/images/product9.jpg" },
    //     { id: 10,other_image_src: "/images/product10.jpg" },
    //     { id: 11,other_image_src: "/images/product11.jpg" },
    //     { id: 12,other_image_src: "/images/product12.jpg" },
    //     { id: 13,other_image_src: "/images/product13.jpg" },
    //     { id: 14,other_image_src: "/images/product14.jpg" },
    // ];

    // // Update each row with the new image source
    // updates.forEach(update => {
    //     db.run(`UPDATE product SET image_src = ? WHERE id = ?`, [update.other_image_src, update.id], function (err) {
    //         if (err) {
    //             console.error('Error updating record:', err.message);
    //         } else {
    //             console.log(`Record updated successfully: ID = ${update.id}, image_src = ${update.other_image_src}`);
    //         }
    //     });
    // });

    
//     db.run('INSERT INTO user (login_cd, password, email, name, phone) VALUES (?, ?, ?, ?, ?)', 
//     ["phong2", '$2b$10$YqrCFnGpaOKt.OheJyjrz.OhxwClnBMLpTHmzCE6Lm.zqhvqkRNKS'
//     , "phong@gmail.com", "PHONG", "9737162681"], function(err) {

// });
});

// Close the database connection
db.close();
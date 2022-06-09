import mysql from "mysql";

// Create pool of connection and supply one when needed: 
const connection = mysql.createPool({
    host: "localhost", // computer name
    user: "root", // database username
    password: "", // database password
    database: "vacation-tag" // database name
});

function execute(sql: string): Promise<any> { // Promisify

    return new Promise<any>((resolve, reject) => {
        
        connection.query(sql, (error, result) => { // If error - first object will contain error, if no error - second object will contain result

            // If there is an error: 
            if(error) {
                reject(error);
                return;
            }

            // No error - report result data: 
            resolve(result);
        });
    });
}

export default {
    execute
};
import mysql from "mysql";
import config from "./config";

// Create pool of connection and supply one when needed: 
const connection = mysql.createPool({
    host: config.sqlHost, // computer name
    user: config.sqlUser, // database username
    password: config.sqlPassword, // database password
    database: config.sqlDatabase // database name
});

function execute(sql: string, values?: any[]): Promise<any> { // Promisify

    return new Promise<any>((resolve, reject) => {

        connection.query(sql, values, (error, result) => { // If error - first object will contain error, if no error - second object will contain result

            // If there is an error: 
            if (error) {
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
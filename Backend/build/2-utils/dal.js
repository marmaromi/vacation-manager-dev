"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
// Create pool of connection and supply one when needed: 
var connection = mysql_1.default.createPool({
    host: config_1.default.sqlHost,
    user: config_1.default.sqlUser,
    password: config_1.default.sqlPassword,
    database: config_1.default.sqlDatabase // database name
});
function execute(sql, values) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, values, function (error, result) {
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
exports.default = {
    execute: execute
};

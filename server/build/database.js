"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const keys_1 = __importDefault(require("./keys"));
const pool = new mssql_1.default.ConnectionPool(keys_1.default.config);
pool.connect()
    .then(connection => {
    console.log('Database connected.');
}, errr => {
    console.log('Error on database connection');
});
exports.default = pool;

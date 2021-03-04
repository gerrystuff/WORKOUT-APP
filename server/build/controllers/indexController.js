"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../database"));
class IndexController {
    async index(req, res) {
        try {
            await database_1.default.connect();
            res.json({ text: 'API IS /' });
        }
        catch (error) {
            console.log('Error tryng to connnect on Training_App');
        }
    }
}
exports.indexController = new IndexController();

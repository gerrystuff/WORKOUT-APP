"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainingController_1 = require("../controllers/trainingController");
class TrainingRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', trainingController_1.trainingController.list);
        this.router.post('/', trainingController_1.trainingController.create);
    }
}
const indexRoutes = new TrainingRoute();
exports.default = indexRoutes.router;

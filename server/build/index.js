"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev')); //en la consola del servidor podemos ver las peticiones que se han hecho al servidor.
        this.app.use(cors_1.default()); //angular puede pedir datos al servidor.
        this.app.use(express_1.default.json()); //podemos aceptar formatos json asi como enviar formatos json desde el servidor. antes esto se hacia con bodyParser
        this.app.use(express_1.default.urlencoded({ extended: false })); //en caso de querer enviar desde un formulario html.
    }
    routes() {
        this.app.use('/', indexRoute_1.default);
    }
}
const server = new Server();
server.start();

import express, { Application } from 'express'
import morgan from 'morgan';
import cors from 'cors';

import IndexRoute from './routes/indexRoute'

class Server {
    
    private app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    start():void{       
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port',this.app.get('port'))
        })
    }

    config():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev')); //en la consola del servidor podemos ver las peticiones que se han hecho al servidor.
        this.app.use(cors()); //angular puede pedir datos al servidor.
        this.app.use(express.json()); //podemos aceptar formatos json asi como enviar formatos json desde el servidor. antes esto se hacia con bodyParser
        this.app.use(express.urlencoded({extended: false})); //en caso de querer enviar desde un formulario html.
    }

    routes():void{
        this.app.use('/',IndexRoute);
    }
    
}

const server = new Server();

server.start();
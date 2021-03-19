import {Router} from 'express';
import {trainingController} from '../controllers/trainingController'

class TrainingRoute {
    public router:Router = Router();
    
    constructor(){
        this.config();
    }

    config(){
        this.router.get('/',trainingController.list);
        this.router.post('/',trainingController.create)
    }
}

const indexRoutes = new TrainingRoute();
export default indexRoutes.router;
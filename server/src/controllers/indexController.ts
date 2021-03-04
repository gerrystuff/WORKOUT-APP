import {Request,Response} from 'express';
import pool from '../database'

class IndexController {
    public async index(req:Request,res:Response):Promise<void>{
        try {
            await pool.connect()
        res.json({text:'API IS /'})
        } catch (error) {
            console.log('Error tryng to connnect on Training_App')
        }
    }
}

export const indexController = new IndexController();
import {Request,Response} from 'express'
import pool from '../database'
import { Exercise } from '../interfaces/Exercise'
import { Serie } from '../interfaces/Serie'
import {Training} from '../interfaces/Training'
import _ from 'lodash'


class TrainingController {
    public async list(req:Request,res:Response){
        try{
            // const trainings = await pool.query("select e.entrenamiento_id as 'Entrenamiento #',s.serie_nombre as 'Serie',ex.ejercicio_nombre as 'Ejercicio',CONCAT(d.sets,'X', d.reps) as 'Repeticiones',m.musculo_nombre as 'Musculo', ex.ejercicio_intensidad as  'Intensidad',s.serie_secuencia as 'Secuencia' from serie s inner join entrenamiento e on s.entrenamiento_id = e.entrenamiento_id inner join Detalles_Serie_Ejercicio d on d.serie_id = s.serie_id inner join Ejercicio ex on d.ejercicio_id = ex.ejercicio_id inner join Musculo m on ex.musculo_id = m.musculo_id")
            const dat = await pool.query('exec sp_getTrainings')

            const trainings = _.chain(dat.recordsets[0])
                        .groupBy('Entrenamiento')
                        .map((value,key) => ({Entrenamiento:key,Series:_.chain(value)
                        .groupBy('Serie')
                        .map((value,key) => {
                        
                            console.log(value)
                        const musclesData = value.map(element => (element.Musculo))                           
                        const muscles = _.union(musclesData)

                        const array = value.map( element => 
                        ({
                            Nombre: element.Ejercicio,
                            Repeticiones: element.Repeticiones
                        }))
                            return { 
                            Nombre:key,
                            Secuencia:value[0].Secuencia,
                            Ejercicios:_.chain(array),
                            Musculos:muscles
                            }
                        })
                    }))
                        .value();

            res.json(trainings)
                
        }catch(error){
            console.log('Error: ',error)
        }
    }

    public async getTrainingsID(req:Request,res:Response){
        try {
            const array = await pool.query("select IDS = e.entrenamiento_id from entrenamientos e")
            res.json(array.recordsets)
        } catch (error) {
            
        }
    }


    public async create(req:Request,res:Response) {        
        let entr_id;
        
        try{
           await pool.request()
           .query('insert into entrenamiento default values')

           const q = await pool.request()
           .query('select top 1 * from entrenamiento order by entrenamiento_id desc')

           const [entrenamiento_id] = q.recordsets
           entr_id = entrenamiento_id[0].entrenamiento_id;

            await pool.request()
            .input("entrenamiento_id",entr_id)
            .input("serie_nombre",req.body.serie_nombre)
            .input("serie_info",req.body.serie_info)
            .input("serie_secuencia",req.body.serie_secuencia)
            .input("serie_dificultad",req.body.serie_dificultad)
            .input("serie_record",req.body.serie_record)
            .query("insert into serie values (@entrenamiento_id,@serie_nombre,@serie_info,@serie_secuencia,@serie_dificultad,@serie_record)")


        }catch(error){

        }
    }
}


export const trainingController = new TrainingController();
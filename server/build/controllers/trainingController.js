"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainingController = void 0;
const database_1 = __importDefault(require("../database"));
const lodash_1 = __importDefault(require("lodash"));
class TrainingController {
    async list(req, res) {
        try {
            // const trainings = await pool.query("select e.entrenamiento_id as 'Entrenamiento #',s.serie_nombre as 'Serie',ex.ejercicio_nombre as 'Ejercicio',CONCAT(d.sets,'X', d.reps) as 'Repeticiones',m.musculo_nombre as 'Musculo', ex.ejercicio_intensidad as  'Intensidad',s.serie_secuencia as 'Secuencia' from serie s inner join entrenamiento e on s.entrenamiento_id = e.entrenamiento_id inner join Detalles_Serie_Ejercicio d on d.serie_id = s.serie_id inner join Ejercicio ex on d.ejercicio_id = ex.ejercicio_id inner join Musculo m on ex.musculo_id = m.musculo_id")
            const dat = await database_1.default.query('exec sp_getTrainings');
            const trainings = lodash_1.default.chain(dat.recordsets[0])
                .groupBy('Entrenamiento')
                .map((value, key) => ({ Entrenamiento: key, Series: lodash_1.default.chain(value)
                    .groupBy('Serie')
                    .map((value, key) => {
                    console.log(value);
                    const musclesData = value.map(element => (element.Musculo));
                    const muscles = lodash_1.default.union(musclesData);
                    const array = value.map(element => ({
                        Nombre: element.Ejercicio,
                        Repeticiones: element.Repeticiones
                    }));
                    return {
                        Nombre: key,
                        Secuencia: value[0].Secuencia,
                        Ejercicios: lodash_1.default.chain(array),
                        Musculos: muscles
                    };
                })
            }))
                .value();
            res.json(trainings);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    }
    async getTrainingsID(req, res) {
        try {
            const array = await database_1.default.query("select IDS = e.entrenamiento_id from entrenamientos e");
            res.json(array.recordsets);
        }
        catch (error) {
        }
    }
    async create(req, res) {
        let entr_id;
        try {
            await database_1.default.request()
                .query('insert into entrenamiento default values');
            const q = await database_1.default.request()
                .query('select top 1 * from entrenamiento order by entrenamiento_id desc');
            const [entrenamiento_id] = q.recordsets;
            entr_id = entrenamiento_id[0].entrenamiento_id;
            await database_1.default.request()
                .input("entrenamiento_id", entr_id)
                .input("serie_nombre", req.body.serie_nombre)
                .input("serie_info", req.body.serie_info)
                .input("serie_secuencia", req.body.serie_secuencia)
                .input("serie_dificultad", req.body.serie_dificultad)
                .input("serie_record", req.body.serie_record)
                .query("insert into serie values (@entrenamiento_id,@serie_nombre,@serie_info,@serie_secuencia,@serie_dificultad,@serie_record)");
        }
        catch (error) {
        }
    }
}
exports.trainingController = new TrainingController();

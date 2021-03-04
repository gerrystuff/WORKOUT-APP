import sql from 'mssql';
import keys from './keys'


const pool = new sql.ConnectionPool(keys.config);

pool.connect()
    .then(connection => {
        console.log('Database connected.')
    },
    errr => {
        console.log('Error on database connection')
    })


    export default pool;
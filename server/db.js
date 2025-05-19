import { Pool } from 'pg'

const pool = new Pool(
    {
        user: 'postgres',
        password: 'admin',
        host: 'localhost',
        port: '5432',
        database: 'collection-of-jokes'
    });

pool.connect().then(() => console.log("Подключено"));

export default pool 

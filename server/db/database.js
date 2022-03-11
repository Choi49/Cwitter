import { config }  from '../config.js';
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
})
//비동기적으로 처리할 거기 때문에 promise를 리턴함
export const db = pool.promise();
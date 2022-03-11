import {db} from '../db/database.js'

// password : abcd1234

export async function findByUsername(username) {
  return db.execute('SELECT * FROM users WHERE username=?',[username])
  //result는 이중배열이고 첫번째 정보만 필요함
  .then((result) => result[0][0]);
}

export async function findById(id) {
  return db.execute('SELECT * FROM users WHERE id=?',[id])
  //result는 이중배열이고 첫번째 정보만 필요함
  .then((result) => result[0][0]);
}

export async function createUser(user) {
  const {username, password, name, email, url} = user;
  console.log(typeof(url));
  return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)', 
    [username, password, name, email, url]
  )
  .then((result) => {
    console.log(result);
  })
}
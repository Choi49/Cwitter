import * as userRepository from "./auth.js";
import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";

// db 연결 없을 때
// let tweets = [
//     {
//         id: '1',
//         text: 'test test',
//         createdAt: Date.now().toString(),
//         userId:'1',
//     },
//     {
//         id: '2',
//         text: 'cweet입니다 :)',
//         createdAt: Date.now().toString(),
//         userId: '1',
//     }
// ]

export async function getAll() {
  //Promise.all을 이용하면 병렬적으로 비동기 실행이 가능
  //() 안에 모든 실행이 끝났을 경우에 Promise.all이 끝남
  //그냥 await로 하는 것 보다 빠름. 왜냐면 await로 할 경우 모든 async를 하나하나 기다릴 것이므로
  // return Promise.all(
  //     tweets.map(async(tweet) => {
  //         const {username, name, url} = await userRepository.findById(
  //             tweet.userId
  //         );
  //         return {...tweet, username, name, url};
  //     })
  // )

  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  // return getAll().then((tweets) =>
  //     tweets.filter((tweet) => tweet.username === username)
  //     );

  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id) {
  // const found = tweets.find((tweet) => tweet.id === id);
  // if(!found) {
  //     return null;
  // }
  // const { username, name, url} = await userRepository.findById(found.userId);
  // return { ...found, username, name, url};

  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  // const tweet = {
  //     id : Date.now().toString(),
  //     text,
  //     createdAt: new Date(),
  //     userId,
  // };
  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);

  return db
    .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)", [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  // const tweet = tweets.find((tweet) => tweet.id = id);
  // if(tweet) {
  //     tweet.text =text;
  // }
  // return getById(tweet.id);

  return db
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  // tweets = tweets.filter((tweet) => tweet.id !== id);

  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}

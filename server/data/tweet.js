import * as userRepository from "./auth.js";
import { getTweets } from "../db/database.js";
import MongoDb from "mongodb";
const ObjectId = MongoDb.ObjectId;
//db 연결 전
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
  return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => {
      console.log(data);
      return mapOptionalTweet({ ...tweet, _id: data.insertedId });
    });
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      //안해주면 업데이트 전에 document를 return함
      { returnDocument: "after" }
      //object 안에 value 안에 들어 있음
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
    console.log(1);
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}

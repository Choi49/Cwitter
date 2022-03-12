import { getUsers } from "../db/database.js";
import MongoDb from "mongodb";

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username })
    .then(data => {
      return (mapOptionalUser(data))});
}

//
export async function findById(id) {
  //mongodb에서 확인해보면 _id형태로 저장되어있음
  //또한 _id가 Object이므로 문자열인 id를 추가로 처리 해줘야함
  return getUsers()
    .findOne({ _id: new MongoDb.ObjectId(id) })
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) =>
      //mongoDb의 경우 id를 Object형태로 저장함, 따라서 toString을 해줌
      data.insertedId.toString()
    );
}

//find한 user가 null일경우 _id를 읽으려 하면 error가 나기 때문에 null인지 아닌지 판별하는 함수를 지정함
function mapOptionalUser(user) {
  //findOne에서 없을경우 null이므로, null일 경우에는 그냥 null(=user)을 return 함
  return user ? { ...user, id: user._id } : user;
}

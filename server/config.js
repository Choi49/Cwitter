import dotenv from "dotenv"
dotenv.config();

//process.env에서 값을 가져오는 경우 서버가 실행할 때 해당 값이 env에 들어있는지 확인할 수 없음
//따라서 미리 확인하고 error를 내주는 function이 있으면 좋음
// defaultValue가 지정 안되있으면 undefined로 나옴
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}


export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },  
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
  db: {
    host: required('DB_HOST'),
  }
}
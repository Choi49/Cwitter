import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import tweetsRouter from "./routes/tweets.js";
import authRouter from "./routes/auth.js";
import "express-async-errors";

// http://expressjs.com/en/resources/middleware/morgan.html
const app = express();

// cookie-parser
// morgan
// cors
// helmet

// cookie-parser
// key: Cookie
// value: yummy_cookie=choco; tasty_cookie=strawberry

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // for options request
  credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(express.json());
//cookie 이용 가능
app.use(cookieParser()); // http://expressjs.com/en/resources/middleware/cookie-parser.html
//들어오는 request를 console.log로 나타내줌
//tiny, common 등등 사용 가능
app.use(morgan("common")); // http://expressjs.com/en/resources/middleware/morgan.html
//cors 자동으로 처리 해줌
app.use(cors());
//각종 attack 방어 해줌
app.use(helmet()); // https://github.com/helmetjs/helmet

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client-tamplate"));
// });

//routers
app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

//맞는 route가 없을 때 일로 옴
app.use((req, res, next) => {
  res.sendStatus(404);
});


app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(8080);

import express from 'express';
import 'express-async-errors';

const router = express.Router();



let tweets = [
    {
        id: '1',
        text: '희진 사랑해 <3',
        createdAt: Date.now().toString(),
        name: 'Choi',
        username: 'Choi',
        url: 'https://wedgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: '2',
        text: 'cweet입니다 :)',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'Bob',
        url: 'https://wedgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    }    
]

// GET /tweets/
// GET /tweets?username=:username/
router.get('/', (req, res) => {
    // query에서 username 을 받아옴
    // 만약 없다면 undefined로 뜸
    const username = req.query.username;
    // ? : 문을 이용하여 username 이 undefined면 tweets 전체 return
    // 아니면 filter를 이용하여 tweets 받아옴
    const data = username 
    ? tweets.filter((t) => t.username === username)
    : tweets;
    res.status(200).json(data);
});


// GET /tweets/:id
router.get(`/:id`,(req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((t) => t.id === id);
    if(tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id(${id}) not found.`});
    }
})



// POST /tweets/
router.post('/',  (req, res, next) => {
    const {text, name, username} = req.body;
    const tweet = {
        id:Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };

    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
})

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((t) => t.id === id);
    if(tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: 'Tweet id not found'});
    }
});

// DELETE /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((t) => t.id !== id);
    res.sendStatus(204);
})


export default router;

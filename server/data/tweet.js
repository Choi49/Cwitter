import * as userRepository from './auth.js';

let tweets = [
    {
        id: '1',
        text: 'test test',
        createdAt: Date.now().toString(),
        userId:'1',
    },
    {
        id: '2',
        text: 'cweet입니다 :)',
        createdAt: Date.now().toString(),
        userId: '1',
    }    
]

export async function getAll() {
    //Promise.all을 이용하면 병렬적으로 비동기 실행이 가능
    //() 안에 모든 실행이 끝났을 경우에 Promise.all이 끝남
    //그냥 await로 하는 것 보다 빠름. 왜냐면 await로 할 경우 모든 async를 하나하나 기다릴 것이므로
    return Promise.all(
        tweets.map(async(tweet) => {
            const {username, name, url} = await userRepository.findById(
                tweet.userId
            );
            return {...tweet, username, name, url};
        })
    )
}

export async function getAllByUsername(username) {
    return getAll().then((tweets) =>
        tweets.filter((tweet) => tweet.username === username)
        );
}

export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found) {
        return null;
    }
    const { username, name, url} = await userRepository.findById(found.userId);
    return { ...found, username, name, url};
}

export async function create(text, userId){
    const tweet = {
        id : Date.now().toString(),
        text,
        createdAt: new Date(),
        userId,
    };
    tweets = [tweet, ...tweets];
    return getById(tweet.id);

}

export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id = id);
    if(tweet) {
        tweet.text =text;
    }
    return getById(tweet.id);
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
const randomArray = require('../random/randomArray')
const axios = require('axios');

const storeResults = (elements, subreddit) => {
    const getRandomElement = randomArray(elements);
    const object = getRandomElement()

    if (object.data.url !== undefined && (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(object.data.url)) {
        if (object.data.title !== '' && object.data.title !== 'undifined') {
            const embed = {
                url: `https://reddit.com${object.data.permalink}`,
                imgUrl: object.data.url,
                upVote: object.data.ups,
                downVote: object.data.downs,
                comments: object.data.num_comments,
                title: object.data.title
            }
            return embed;
        }
        else {
            const embed = {
                url: `https://reddit.com${object.data.permalink}`,
                imgUrl: object.data.url,
                upVote: object.data.ups,
                downVote: object.data.downs,
                comments: object.data.num_comments,
                title: undefined
            }
            return embed;
        }
    }
    else {
        console.log(`Not a supported link`)
        storeResults(elements, subreddit)
    }
}

module.exports = async (subreddit) => {

    try {
        const { data } = await axios.get(subreddit)
        return new Promise((resolve, reject) => {
            const embedMessage = storeResults(data.data.children, subreddit)
            resolve(embedMessage)
        })
    }
    catch (err) {
        console.log(err.message)
    }
}
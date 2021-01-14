const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')
const axios = require('axios')


module.exports = class MemeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            group: 'fun',
            memberName: 'meme',
            description: 'Send Programming related memes by default',
            argsPromptLimit: 1,
            argsCount: 0,
            argsType: 'multiple',
            format: '<new> | <hot> | <top> by default hot takes only 1 argument'
        })
    }
    async run(message, args) {
        const category = args || 'hot'
        const reddit = [
            `https://www.reddit.com/r/ProgrammerHumor/${category}/.json`,
            `https://www.reddit.com/r/codingmemes/${category}/.json`,
            `https://www.reddit.com/r/ProgrammerAnimemes/${category}/.json`
        ]
        const subreddit = reddit[Math.floor(Math.random() * reddit.length)]
        const embed = new MessageEmbed()
        const { data } = await axios.get(subreddit)
        try {
            // if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif')) 
            const { url, title, ups, downs, num_comments } = data.data.children[0].data
            console.log(`Image: ${url}  Title: ${title}`)
            embed.setTitle(`${title}`)
            //embed.setURL(`${memeUrl}`)
            embed.setImage(url)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${ups} 👎 ${downs} 💬 ${num_comments}`)
            message.channel.send(embed);
        } catch (error) {
            console.error('ERR:', error.message)
        }

        // axios
        //     .get('https://www.reddit.com/r/memes/new/.json')
        //     .then((response) => {
        //         let content = JSON.parse(response.body);
        //         let permalink = content[0].data.children[0].data.permalink;
        //         let memeUrl = `https://reddit.com${permalink}`;
        //         let memeImage = content[0].data.children[0].data.url;
        //         let memeTitle = content[0].data.children[0].data.title;
        //         let memeUpvotes = content[0].data.children[0].data.ups;
        //         let memeDownvotes = content[0].data.children[0].data.downs;
        //         let memeNumComments = content[0].data.children[0].data.num_comments;
    }
}
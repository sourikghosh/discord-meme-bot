const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')
const randomArray = require('../../util/random/randomArray')
const memeExtraction = require('../../util/meme/memeExtraction')
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
        const category = (!args[0]) ? 'hot' : args
        const reddit = [
            `https://www.reddit.com/r/ProgrammerHumor/${category}/.json`,
            `https://www.reddit.com/r/codingmemes/${category}/.json`,
            `https://www.reddit.com/r/ProgrammerAnimemes/${category}/.json`
        ]
        const subreddit = randomArray(reddit)

        try {
            const memeObject = await memeExtraction(subreddit())
            const embed = new MessageEmbed()
            embed.setImage(memeObject.imgUrl)
            embed.setURL(memeObject.url)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeObject.upVote} 👎 ${memeObject.downVote} 💬 ${memeObject.comments}`)
            if (memeObject.title !== undefined) {
                embed.setTitle(memeObject.title)
            }
            message.channel.send(embed);
        }

        catch (error) {
            console.error('ERR:', error.message)
        }
    }
}
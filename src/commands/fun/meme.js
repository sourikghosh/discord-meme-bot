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
            const { url } = data.data.children[0].data
            if ((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(url)) {

                const { permalink, title, ups, downs, num_comments } = data.data.children[0].data

                if (title !== '' && title !== 'undifined') { embed.setTitle(`${title}`) }
                embed.setURL(`https://reddit.com${permalink}`)
                embed.setImage(url)
                embed.setColor('RANDOM')
                embed.setFooter(`👍 ${ups} 👎 ${downs} 💬 ${num_comments}`)

                message.channel.send(embed);
            }
            else {
                console.log(`Not Valid image`)
            }

        } catch (error) {
            console.error('ERR:', error.message)
        }
    }
}
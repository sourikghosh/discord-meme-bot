const { CommandoClient } = require('discord.js-commando')
const { join } = require('path')

const client = new CommandoClient({
    owner: process.env.OWNER_ID,
    commandPrefix: process.env.PREFIX,
})

client.on('ready', async () => {
    console.log(`The client is ready!Logged in as ${client.user.username}#${client.user.discriminator}`)
    client.registry
        .registerGroups([
            ['fun', 'fun commands'],
            ['moderation', 'moderation commands'],
            ['economy', 'Commands for the economy system'],
            ['giveaway', 'Commands to manage giveaways'],
            ['games', 'Commands to handle games'],
            ['thanks', 'Commands to help thank people'],
        ])
        .registerDefaults()
        .registerCommandsIn(join(__dirname, 'commands'))
})

client.login(process.env.TOKEN)
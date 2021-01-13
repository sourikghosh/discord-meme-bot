import { Client } from 'discord.js'
const client = new Client()
client.on('ready', () => {
    console.log(`Logged in !`);
})

client.login(process.env.TOKEN)
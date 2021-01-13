import { join } from 'path'
import { readdirSync, lstatSync } from 'fs'
import { Client } from 'discord.js'
import { commandBase } from './commands/command-base'

const client = new Client()

client.on('ready', async () => {
    console.log(`Logged in !`);

    const readCommands = (dir: string) => {
        const files = readdirSync(join(__dirname, dir))
        for (const file of files) {
            const stat = lstatSync(join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(join(dir, file))
            } else if (file !== 'command-base.js' && file !== 'command-base.ts') {
                const { Options } = require(join(__dirname, dir, file))
                //console.log(Options)
                commandBase(client, Options)
            }
        }
    }

    readCommands('commands')
})

client.login(process.env.TOKEN)
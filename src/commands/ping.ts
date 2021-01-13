import { CommonOptions } from "child_process"

export const Options = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    callback: (message: any, argument: any, text: string) => {
        message.reply('Pong!')
    },
}
const discord = require('discord.js')
const fs = require('fs')
const ecoledirecte = require('api-ecoledirecte-france')
const request = require('request')
// token
let secrets = {}
try {
    secrets = require('./secrets.json')
} catch (e) {}

const token = process.env.TOKEN || secrets.token

const {Intents, Client} = require('discord.js')
const options = require('./configs.json')
let allIntents = []
for(let i in Intents.FLAGS) {
    allIntents.push(i)
}
const client = new Client({
    intents: allIntents
})

const vars = {
    discord,
    client,
    options,
    commands: [],
    events: [],
    ecoledirecte
}

// commands
const c = fs.readdirSync('./src/commands', {encoding: 'utf-8'})
for(let file of c) {
    if(file.endsWith('.js') && !file.startsWith('_')){
        const module = require('./commands/' + file.replace('.js',''))
        if(module.active) vars.commands.push(module)
    }
}

// events
const e = fs.readdirSync('./src/events', {encoding: 'utf-8'})
for(let file of e) {
    if(file.endsWith('.js') && !file.startsWith('_')){
        const module = require('./events/' + file.replace('.js',''))
        if(module.active) vars.events.push(module)
    }
}

for(let event of vars.events) {
    client.on(event.name, (e) => {
        event.run(e, vars)
    })
}

async function registerCommands(id, commands) {
    for(let command of commands) {
        const commandData = {
            name: command.name,
            description: command.description,
            type: command.type
        }
        const apiEndPointGlobal = `https://discord.com/api/v8/applications/${id}/commands`

        request.post(apiEndPointGlobal, {
            method: "POST",
            json: JSON.stringify(commandData),
            headers: {
                'Authorization': 'Bot ' + token,
                'Content-Type': 'application/json'
            }
        })
    }
}

// registerCommands("887684698988478525", vars.commands)

client.login(token)
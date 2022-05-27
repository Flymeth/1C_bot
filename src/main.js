const discord = require('discord.js')
const fs = require('fs')
const ecoledirecte = require('api-ecoledirecte-france')
const options = require('./configs.json')
const package = require('../package.json')
// token
let secrets = {}
try {
    secrets = require('./secrets.json')
} catch (e) {}

const token = process.env.TOKEN || secrets.token || secrets.token

const {Intents, Client} = require('discord.js')
let allIntents = []
for(let i in Intents.FLAGS) {
    allIntents.push(i)
}
const client = new Client({
    intents: allIntents
})

// Load assets (path location in the options.json file)
// const assets = getAssets() ==> Find a way to attach a local file to discord image embed
const {assets} = options

const vars = {
    discord,
    client,
    options,
    commands: [],
    events: [],
    ecoledirecte,
    token,
    assets,
    package
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

// load events
for(let event of vars.events) {
    client.on(event.name, (e) => {
        event.run(e, vars)
    })
}

client.login(token)
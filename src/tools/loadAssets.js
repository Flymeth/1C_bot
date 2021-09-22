const {MessageAttachment} = require('discord.js')
const {readFileSync} = require('fs')
const {assets} = require('../configs.json')

/***
 * 
 * @returns discord message attachment
 */
module.exports.getAssets = () => {
    const answer = {}
    for(let name in assets) {
        const path = assets[name]
        try {
            var file = readFileSync(path, {encoding: 'utf-8'})
        } catch (e) {throw e}

        const {attachment} = new MessageAttachment(file, name)
        answer[name] = attachment
    }
    return answer
}
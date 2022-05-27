const fs = require('fs')
module.exports = {
    name: "interactionCreate",
    active: true,
    run: async (e, vars) => {
        if(!e.isCommand() && !e.isContextMenu() || e.channel.type === "DM") return
        const {commandName} = e
        const command = vars.commands.find(c => c.name === commandName.toLowerCase())

        const varsSlash = {...vars}

        varsSlash.slash = e.options

        // A partir de ce moment là on peut executer la commande

        // les couleurs (de l'utilisateur & du bot)
        const colors = {
            user: e.member.displayColor,
            bot: e.guild.me.displayColor
        }

        varsSlash.colors = colors

        // si la commande a besoin de sous-commandes
        if(command.required) {
            const files = []
            const filePath = './src' + command.required.replace('.', '')
            const modulePath = '..' + command.required.replace('.', '')

            const c = fs.readdirSync(filePath, {encoding: 'utf-8'})
            for(let file of c) {
                if(file.endsWith('.js') && !file.startsWith('_')) {
                    const module = require(modulePath + '/' + file.replace('.js',''))
                    if(module.active) files.push(module)
                }
            }
            varsSlash.files = files
        }
        await e.deferReply()

        e.reply = e.editReply
        try {
            command.run(e, varsSlash, [])
        } catch (e) {
            console.log('Error on command: ' + command.name + " (event: interactionCommand): ", e);
        }
    }
}
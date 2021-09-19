const fs = require('fs')
module.exports = {
    name: "interactionCreate",
    active: true,
    run: (e, vars) => {
        if(!e.isCommand() && !e.isContextMenu()) return
        const {commandName} = e
        const command = vars.commands.find(c => c.name === commandName)

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

        command.run(e, varsSlash, [])
    }
}
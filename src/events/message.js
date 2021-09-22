const fs = require('fs')
module.exports = {
    name: "messageCreate",
    active: true,
    run: (e, vars) => {
        if(
            e.author.id === vars.client.user.id
            || e.channel.type === "DM"
        ) return

        if(e.mentions.users.first() === vars.client.user && e.content.length <= 22) {
            return e.reply("My prefix is `" + vars.options.prefix + "`!")
        }

        if(!e.content.startsWith(vars.options.prefix)) return
        const args = e.content.replace(vars.options.prefix,'').split(' ')
        const command = (args.shift()).toLowerCase()

        const doCommand = vars.commands.find(c => {
            if(c.name === command) return true
            if(c.alias) return c.alias.find(a => a === command)
        })
        if(!doCommand) return

        // A partir de ce moment là on peut executer la commande

        // les couleurs (de l'utilisateur & du bot)
        const colors = {
            user: e.member.displayColor,
            bot: e.guild.me.displayColor
        }

        vars.colors = colors
        vars.loadingEmote = vars.client.emojis.cache.find(e => e.name === 'loading')

        // si la commande a besoin de sous-commandes
        if(doCommand.required) {
            const files = []
            const filePath = './src' + doCommand.required.replace('.', '')
            const modulePath = '..' + doCommand.required.replace('.', '')

            const c = fs.readdirSync(filePath, {encoding: 'utf-8'})
            for(let file of c) {
                if(file.endsWith('.js') && !file.startsWith('_')) {
                    const module = require(modulePath + '/' + file.replace('.js',''))
                    if(module.active) files.push(module)
                }
            }
            vars.files = files
        }

        doCommand.run(e, vars, args)
    }
}
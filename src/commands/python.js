const process = require('child_process')
const fs = require('fs')

module.exports = {
    name: "python",
    alias: [
        "py"
    ],
    active: true,
    description: "Execute du code python directement sur discord!",
    type: 3,
    run: async (e, vars, args) => {
        let messageID = ""
        
        if(!vars.slash) messageID = e.reference.messageId
        else messageID= vars.slash["_hoistedOptions"][0].message.id

        const color = "#2485EF"

        const helpEmbed1 = new vars.discord.MessageEmbed()
        .setTitle("Comment utiliser cette commande ?")
        .addField("Etape #1:", "Créez un block de code (voir image 1) avec le code à executé à l'interrieur. Puis envoyer le sur le salon actuel.")
        .addField("Etape #2:", "Répondez au message que vous venez d'envoyer avec la commande `1c.python`.")
        .addField("Etape #3:", "Obtenez votre résultat.")
        .setFooter("Note: les fonction input() ne fonctioneront pas. De plus si votre code prend plus de 1s à être executé, il sera automatiquement arrêté.")
        .setColor(color)

        const helpEmbed2 = new vars.discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/888478345229139980/888478384261324880/python_tuto_0.png')
        .setColor(color)

        const helpEmbed3 = new vars.discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/888478345229139980/888478385792241684/python_tuto_1.png')
        .setColor(color)

        const embeds = [helpEmbed1, helpEmbed2, helpEmbed3]

        if(!messageID) {
            e.reply({content: "Voici comment utiliser cette commande:", embeds})
            return
        }

        const code = e.channel.messages.cache.get(messageID)
        if(!code.content.startsWith("```py") || !code.content.endsWith('```')) return e.reply({content: "Ton code ne peux pas être interprété en python. Voici comment utiliser cette commande:", embeds})

        const loadingEmoji = vars.client.emojis.cache.find(e => e.name === 'loading')

        if(!vars.slash) {var reaction = await e.react(loadingEmoji)}

        let python = code.content.replace('```py', '')
        python = python.substr(0, python.length-3)

        const pythonPath = `./src/python_executer.py`
        fs.writeFileSync(pythonPath, python.toString())
        
        
        const exe = process.spawn('python', [pythonPath], {
            timeout: 1000,
            env: {
                ...process.env,
                "PYTHONIOENCODING":"utf_8"
            }
            
        })

        exe.stdout.setEncoding('utf8')

        let out = ""
        let errored = false

        // si data
        exe.stdout.on('data', (data) => {
            out+=data.toString()
        })
        // si erreur
        exe.stderr.on('data', (err) => {
            errored= true
            out+=err.toString()
        })

        exe.on('exit', () => {
            if(out.length > 1000) {
                out = out.substr(0, 1000) + '[...]'
            }

            if(!vars.slash) reaction.users.remove()

            
            fs.writeFileSync(pythonPath, "")
            exe.kill()

            // si il y a une erreur, on change la couleur de l'embed
            const embedColor = errored ? "#E92626" : color

            const outEmbed = new vars.discord.MessageEmbed()
            .setColor(embedColor)
            .setAuthor(`Voici le résultat de ton programe ${errored? "(erreur)" : ""}:`, e.member.user.displayAvatarURL({dynamic: true, size: 1024}))
            .setDescription('```console\n ' + out + '```')
            e.reply({embeds: [outEmbed]})
        })
    }
}
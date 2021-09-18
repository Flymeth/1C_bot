module.exports = {
    name: "messages",
    alias: [
        "mails",
    ],
    description: "Informes toi des derniers message envoyé par l'Etablissement!",
    active: true,
    needAccount: true,
    run: async(e, vars, args) => {
        const {account} = vars
        const {data} = await vars.ecoledirecte.getMessages(account.token, account.ecoledirecte.id)
        const {received} = data.messages

        if(!received) return e.reply({content: "Tu n'as aucun message présent dans ta messagerie!", ephemeral: true})

        const sortedByName = {}
        for(let msg in received) {
            const infos = received[msg]
            const {from} = infos
            if(!sortedByName[from.name]) sortedByName[from.name] = []

            sortedByName[from.name].push(infos)
        }

        const embed = new vars.discord.MessageEmbed()
        .setAuthor("Tu as " + received.length + " message(s):", e.member.user.displayAvatarURL({size: 1024, dynamic: true}))
        .setColor(vars.colors.user || vars.colors.bot || "RANDOM")
        for(let author in sortedByName) {
            const messages = sortedByName[author]
            let txt = ""

            for(let message of messages) {
                const timestamp = new Date(message.date)
                if(txt) txt+="\n"
                txt+=`${timestamp.getDate()}/${timestamp.getMonth()+1}/${timestamp.getFullYear()}: ${message.subject}`
            }

            embed.addField(`De ${author}:`, "```" + txt + "```")
        }

        e.reply({embeds: [embed]})
    }
}
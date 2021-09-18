module.exports = {
    name: "devoirs",
    alias: [
        "dm",
    ],
    description: "Accède à la liste de tes devoirs!",
    active: true,
    needAccount: true,
    run: async(e, vars, args) => {
        const {account} = vars
        const homeworks = await vars.ecoledirecte.getHomeworks(account.token, account.ecoledirecte.id)

        if(!homeworks.data) return e.reply("Woaa... Tu n'as aucun devoirs!!")

        const legends = {
            "effectue": {
                emoji: "🟢",
                desc: "Effectué"
            },
            "interrogation": {
                emoji: "⚠️",
                desc: "Interrogation"
            },
            "rendreEnLigne": {
                emoji: "📥",
                desc: "Rendre en ligne"
            }
        }

        let legendTxt = ""
        for(let id in legends) {
            if(legendTxt) legendTxt+= "\n"
            legendTxt+= `> \`${legends[id].emoji}\` = *${legends[id].desc}*`
        }

        const embed = new vars.discord.MessageEmbed()
        .setAuthor('Et voici tes devoirs:', e.author.displayAvatarURL({size: 1024, dynamic: true}))
        .setDescription("Légendes:\n" + legendTxt)
        .setColor(vars.colors.user || vars.colors.bot || "RANDOM")
        for(let date in homeworks.data) {
            let works = ""

            const dataWork = homeworks.data[date]
            const timestamp = new Date(date)

            for(let id in dataWork) {
                if(works) works+= "\n"

                const workInfos = dataWork[id]
                for(let info in workInfos) {
                    if(workInfos[info] && legends[info]) works+= `${legends[info].emoji}`
                }

                works+= workInfos.matiere
            }


            embed.addField(`Pour le ${timestamp.getDate()}/${timestamp.getMonth()+1}/${timestamp.getFullYear()}:`, "```" + works + "```", true)
        }

        return e.reply({embeds: [embed]})
    }
}
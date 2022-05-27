module.exports = {
    name: "notes",
    description: "Affiche toutes tes notes!",
    active: true,
    needAccount: true,
    run: async(e, vars, args) => {
        const {account} = vars
        const {data} = await vars.ecoledirecte.getNotes(account.token, account.ecoledirecte.id)
        let {notes} = data
        const sortedNotes = {}
        for(let note of notes.filter(n => n.libelleMatiere)) {
            if(!sortedNotes[note.libelleMatiere]) sortedNotes[note.libelleMatiere] = []
            sortedNotes[note.libelleMatiere].push(note)
        }
		
        const legends = {
            "nonSignificatif": {
                emoji: "👓",
                desc: "Non significatif"
            }
        }

        let legendTxt = ""
        for(let id in legends) {
            if(legendTxt) legendTxt+= "\n"
            legendTxt+= `> \`${legends[id].emoji}\` = *${legends[id].desc}*`
        }

        const allNotes = {
            notes: [],
            dividende: 0,
            total: 0
        }

        const embed = new vars.discord.MessageEmbed()
        .setAuthor('Et voici tes notes:', e.member.user.displayAvatarURL({size: 1024, dynamic: true}))
        .setDescription("**__Légendes:__**\n" + legendTxt)
        .setColor(vars.colors.user || vars.colors.bot || "RANDOM")
        for(let matiere in sortedNotes) {
            const notes = sortedNotes[matiere]
            let txt = ""
            let infosNotes = {
                total: 0,
                dividende: 0,
                notes: []
            }
            for(let infos of notes) {
                if(txt) txt+= "\n"
                for(let legend in legends) {
                    if(infos[legend]) txt+= legends[legend].emoji
                }
                // parse float for numbers
                for(let i in infos) {
                    try {
                        infos[i] = parseFloat(infos[i])
                    } catch (e) {}
                }
                if( isNaN(infos.noteSur) 
                    || isNaN(infos.valeur)
                ) continue

                const sur20 = ((infos.valeur*20)/ infos.noteSur).toFixed(2)
                
                infosNotes.total+= sur20*infos.coef
                infosNotes.notes.push(parseFloat(sur20))
                infosNotes.dividende+= infos.coef
                
                allNotes.total+= sur20*infos.coef
                allNotes.notes.push(parseFloat(sur20))
                allNotes.dividende+= infos.coef

                txt+= '> '
                txt+= `${infos.valeur}/${infos.noteSur} (coef: ${infos.coef}; moy: ${infos.moyenneClasse}/${infos.noteSur})`
            }
            infosNotes.moyenne = (infosNotes.total/infosNotes.dividende).toFixed(2)

            embed.addField(matiere + ` (moy: ${infosNotes.moyenne}/20)`, '```' + txt + '```')
        }
        
        allNotes.moyenne = (allNotes.total/allNotes.dividende).toFixed(2)
        allNotes.min = Math.min(...allNotes.notes)
        allNotes.max = Math.max(...allNotes.notes)
        embed.description+= `\n\n**__Infos:__**\n> Moyenne général: ${allNotes.moyenne}/20\n> Note minimal: ${allNotes.min}/20\n> Note maximal: ${allNotes.max}/20`

        return e.reply({embeds: [embed]})
    }
}
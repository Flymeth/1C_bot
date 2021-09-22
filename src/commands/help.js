module.exports = {
    name: "help",
    active: true,
    alias: [
        "h"
    ],
    description: "Découvrez tout ce que je suis capable de faire!",
    type: 1,
    run: (e, vars, args, commands, mainCommand, footer) => {
        const {colors} = vars
        const embed = new vars.discord.MessageEmbed()
        .setColor(colors.user || colors.bot || "RANDOM")
        .setTitle("Liste des commandes:")
        for(let command of (commands || vars.commands)) {
            let aliasList = ""
            if(command.alias) {
                for(let a of command.alias) {
                    if(aliasList) aliasList+= ", "
                    aliasList+= a
                }
            }
            
            embed.addField("`" + vars.options.prefix + (mainCommand ? mainCommand + " " : "") + command.name + "`" + (aliasList ? " (alias: *`" + aliasList + "`*)" : ""), command.description)
        }
        if(footer) embed.setFooter(footer)
        
        return e.reply({embeds: [embed]})
    }
}
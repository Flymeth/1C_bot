const fs = require('fs')
module.exports = {
    name: "ping",
    active: true,
    description: "Faite cette commande pour en connaitre plus sur moi!",
    type: 1,
    run: (e, vars, args) => {
        const embed = new vars.discord.MessageEmbed()
        .setTitle("Informations:")
        .setColor(vars.colors.bot || vars.colors.user || "RANDOM")
        .addField("Préfix:", "`" + vars.options.prefix + "` (`" + vars.options.prefix + "help`)")
        .addField("GitHub (code source):", vars.package.homepage)
        .addField("Développeur:", `[${vars.options.developper.name}](${vars.options.developper.website})`)
        .addField("Ping (latence):", "`" + vars.client.ws.ping + "ms`")
        return e.reply({embeds: [embed]})
    }
}
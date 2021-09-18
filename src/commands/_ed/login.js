const { DiscordAPIError } = require("discord.js")
const {saveAccount, getAccount} = require('./_manageAccounts')

module.exports = {
    name: "login",
    alias: [
        "connect",
        "register",
        "set"
    ],
    description: "Connectes-toi à ton compte EcoleDirecte!",
    active: true,
    run: async (e, vars, args) => {
        const embed = new vars.discord.MessageEmbed()
        .setColor(vars.colors.user || "RANDOM")
        .setTitle("Entres ton nom d'utilisateur:")
        .setFooter("Notez qu'en aucun cas votre nom d'utilisateur & votre mot de passe ne seront enregistrés de quelques façons qu'il soit.")
        const dmChannel = await e.author.createDM()

        e.author.send({embeds: [embed]}).then(async message => {
            const securityMSG = await e.reply(`Pour des raisons de sécurités, la suite se passe en message privées!\n> https://discord.com/channels/@me/${dmChannel.id}/${message.id}`)
            const messageForAccount = await message.channel.awaitMessages({max: 1, time: vars.options.awaitTime})
            const accountName = messageForAccount.first()

            async function end(msg) {
                await message.delete()
                await securityMSG.delete()
                await message.channel.send(msg)
            }

            if(!accountName) {
                return end(`Oups: vous n'avez pas indiquer de nom d'utilisateur.\n> https://discord.com/channels/${e.guild.id}/${e.channel.id}`)
            }
            await accountName.react("💾")

            embed.setTitle("Entre ton mot de passe:")
            await message.edit({embeds: [embed]})

            const messageForMDP = await message.channel.awaitMessages({max: 1, time: vars.options.awaitTime})
            const accountMDP = messageForMDP.first()
            if(!accountMDP) {
                return end(`Oups: vous n'avez pas indiquer de nom de mot de passe.\n> https://discord.com/channels/${e.guild.id}/${e.channel.id}`)
            }
            await accountMDP.react("💾")

            embed.setTitle("Verification du compte...")
            .setColor("#F4730E")
            await message.edit({embeds: [embed]})

            var account = await vars.ecoledirecte.accounts(accountName.content, accountMDP.content)

            if(!account || !account.length) {
                await accountName.react("❎")
                await accountMDP.react("❎")
                return end(`Et non! L'identifiant et/ou le mot de passe est invalide! **Je te rappel qu'utiliser un compte qui n'est pas le tiens n'est pas vraiment autorisé** ^^.\n> https://discord.com/channels/${e.guild.id}/${e.channel.id}`)
            }

            embed.setTitle("Enregistrement du compte...")
            .setColor("#0EF421")
            await message.edit({embeds: [embed]})

            const saved = saveAccount(vars, accountName.content, accountMDP.content, e.author)

            if(typeof saved === "string") {
                // Si erreur (ou l'utilisateur est déjà connecté)
                return end(`${saved}\n> https://discord.com/channels/${e.guild.id}/${e.channel.id}`)
            }

            // Si ca a été enregistré
            end(`Ton compte EcoleDirecte est maintenant lié à celui de discord!\n> https://discord.com/channels/${e.guild.id}/${e.channel.id}`)
            e.reply("Tu es désormais connecté!")
        })
    }
}
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

        var reaction;
        if(!vars.slash) reaction = await e.react(vars.loadingEmote)

        const isUser = await getAccount(e.member.user)
        if(isUser) {
            if(!vars.slash) await reaction.remove()
            return e.reply("Tu es déjà connecté! Si tu veux te connecter à un autre compte, il te faudra faire la commande `" + vars.options.prefix + "ecoleDirecte logout` pour te déconnecter de ce compte.")
        }

        const embed = new vars.discord.MessageEmbed()
        .setColor(vars.colors.user || "RANDOM")
        .setTitle("Entres ton nom d'utilisateur:")
        .setFooter("Notez que votre identifiant et mot de passe seront sauvegardé afin de ne pas à avoir à vous reconnecter à chaques commande (vos informations seront bien evidement criptés et innaccecible). Lors de votre déconnection, toutes vos informations seront oublié (également votre identifiant et mot de passe).")
        const dmChannel = await e.member.user.createDM()

        e.member.user.send({embeds: [embed]}).then(async message => {
            const securityMSG = await e.reply({content: `Pour des raisons de sécurités, la suite se passe en message privées!\n> https://discord.com/channels/@me/${dmChannel.id}/${message.id}`, ephemeral: true})
            const messageForAccount = await message.channel.awaitMessages({max: 1, time: vars.options.awaitTime})
            const accountName = messageForAccount.first()

            async function end(msg) {
                if(!vars.slash) {
                    if(await e.channel.messages.cache.get(e.id)) e.delete()
                }
                if(await message.channel.messages.cache.get(message.id)) await message.delete()
                if(await securityMSG.channel.messages.cache.get(securityMSG.id)) await securityMSG.delete()
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

            const saved = saveAccount(vars, accountName.content, accountMDP.content, e.member.user)

            if(typeof saved === "string") {
                // Si erreur (ou l'utilisateur est déjà connecté)
                return end(`${saved}\n> https://discord.com/channels/${e.guild.id}/${e.channel.id}`)
            }

            // Si ca a été enregistré
            e.channel.send(e.member.user.toString() + " vient de connecter son compte ecoleDirecte à celui de discord!")
            return end(`Ton compte EcoleDirecte est maintenant lié à celui de discord!\n> https://discord.com/channels/${e.guild.id}/${e.channel.id}`)
        })
    }
}
const {resetAccount} = require('./_manageAccounts')
module.exports = {
    name: "removeAccount",
    alias: [
        "rmact",
        "rma",
        "rmvaccount"
    ],
    description: "Permet de forcer la déconnection d'un utilisateur à son compte ecoleDirecte.",
    active: true,
    needAccount: false,
    run: async(e, vars, args) => {
        const canDo = vars.options.admins.find(identifiant => identifiant === e.member.user.id)
        if(!canDo) return e.reply({content: "Tu ne peux pas vraiment faire cela...", ephemeral: true})
        let user;

        if(!vars.slash) user = e.mentions.users.first()
        else {
            e.reply("Mentionnez un membre à qui il faut délier le compte:")
            const filter = m => m.author.id === e.member.user.id
            const msg = await e.channel.awaitMessages({filter, max: 1, time: vars.options.awaitTime})
            if(!msg.first()) return
            user = msg.first().mentions.users.first()
            e= msg.first()
        }


        if(!user) return e.reply({content: "Pour utiliser cette commande, vous devez mentionner l'utilisateur dont le compte écoleDirecte doit être supprimer de celui de discord.", ephemeral: true})

        const done = resetAccount(user)
        if(typeof done === "string") return e.reply({content: done, ephemeral: true})
        else {
            user.send("Ton compte discord vient d'être délié de ton compte EcoleDirecte. Pour plus d'information, renseignes-toi auprès de `" + e.member.user.tag + "`.")
            return e.reply("Le compte ecoleDirecte de `" + user.tag + "` a été délié de celui de discord!")
        }
    }
}
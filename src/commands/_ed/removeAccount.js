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
        const canDo = vars.options.admins.find(identifiant => identifiant === e.author.id)
        if(!canDo) return e.reply("Tu ne peux pas vraiment faire cela...")
        const user = e.mentions.users.first()
        if(!user) return e.reply("Pour utiliser cette commande, vous devez mentionner l'utilisateur dont le compte écoleDirecte doit être supprimer de celui de discord.")

        const done = resetAccount(user)
        if(typeof done === "string") return e.reply(done)
        else {
            e.reply("Le compte ecoleDirecte de `" + user.tag + "` a été délié de celui de discord!")
            user.send("Ton compte discord vient d'être délié de ton compte EcoleDirecte. Pour plus d'information, renseignes-toi auprès de `" + e.author.tag + "`.")
        }
    }
}
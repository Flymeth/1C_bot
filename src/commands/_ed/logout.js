const {resetAccount} = require('./_manageAccounts')
module.exports = {
    name: "logout",
    description: "Déconnectes-toi de ton compte ecoleDirecte!",
    active: true,
    needAccount: true,
    run: async(e, vars, args) => {
        const done = resetAccount(e.member.user)
        if(typeof done === "string") return e.reply({content: done, ephemeral: true})
        else return e.reply("Tu a été déconnecté!")
    }
}
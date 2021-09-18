module.exports = {
    name: "stop",
    active: true,
    description: "Deconnecte le robot (vous devez faire partie de la liste d'amin du robot)",
    type: 1,
    run: async (e, vars, args) => {
        const {id} = e.member.user
        const canDo = vars.options.admins.find(identifiant => identifiant === id)
        if(!canDo) return e.reply("Désolé, mais cette commande n'est pas faite pour toi ^^")
        if(!vars.slash) await e.react("⚰")
        else await e.reply({content: "Snif... Adieu monde cruel :(", ephemeral: true})
        await vars.client.destroy()
        throw console.log(e.member.user.tag + " vient de me déconnecter.")
    }
}
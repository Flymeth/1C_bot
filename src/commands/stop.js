module.exports = {
    name: "stop",
    active: true,
    description: "Deconnecte le robot (vous devez faire partie de la liste d'amin du robot)",
    type: 1,
    run: async (e, vars, args) => {
        const {id} = e.author
        const canDo = vars.options.admins.find(identifiant => identifiant === id)
        if(!canDo) return e.reply("Désolé, mais cette commande n'est pas faite pour toi ^^")
        await e.react("⚰")
        await vars.client.destroy()
        console.log(e.author.tag + " vient de me déconnecter.")
    }
}
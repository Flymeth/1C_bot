module.exports = {
    name: "report",
    active: true,
    description: "Me faire part de commentaire, d'un bug trouvé et/ou d'un problème de compte.",
    type: 1,
    options: [
        {
            name: "message",
            description: "Le message que vous souhaitez m'envoyer",
            type: 3,
            required: true,
        }
    ],
    run: async (e, vars, args) => {
        const message = args.join(' ') || vars.slash.getString("message")

        if(!message || message.length < 100) return e.reply({content: "Ton message dois faire minimum 100 lettres (pour me permettre de comprendre au maximum ton problème.)", ephemeral: true})

        const devUser = vars.client.users.cache.get(vars.options.developper.discord_id)
        await devUser.send("**__REPORT FROM `" + e.member.user.tag + "`:__**\n\n" + message)
        e.reply({content: "Ton message a été pris en compte!", ephemeral: true})
    }
}
module.exports = {
    name: "report",
    active: true,
    description: "Me faire part de commentaire, d'un bug trouvé et/ou d'un problème de compte.",
    type: 1,
    run: async (e, vars, args) => {
        if(!args.length || e.content < 100) return e.reply("Ton message dois faire minimum 100 lettres (pour me permettre de comprendre au maximum ton problème.)")

        const devUser = vars.client.users.cache.get(vars.options.developer)
        await devUser.send("**__REPORT FROM `" + e.author.tag + "`:__**\n\n" + args.join(' '))
        e.reply("Ton message a été pris en compte!")
    }
}
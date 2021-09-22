const help = require('./help')
const {getAccount, reloadAccount} = require('./_ed/_manageAccounts')
module.exports = {
    name: "ecoledirecte",
    active: true,
    alias: [
        "ed"
    ],
    description: "Récuperez vos devoirs, la vie scolaire et pleins d'autre choses grâce à cette commande!",
    required: "./commands/_ed",
    type: 1,
    options: [
        {
            name: "action",
            description: "Action que vous souhaitez executer",
            type: 3,
            choices: [
                {name: "Se connecter", value: "login"},
                {name: "Se déconnecter", value: "logout"},
                {name: "Tes devoirs", value: "devoirs"},
                {name: "Tes notes", value: "notes"},
                {name: "Ta messagerie", value: "messages"},
                {name: "Information de compte", value: "account"},
                {name: "Supprimer un compte", value: "removeAccount"}
            ]
        }
    ],
    run: async (e, vars, args) => {
        const commands  = vars.files
        let subCommand = args.shift()

        // Si c'est une commande slash
        if(vars.slash) subCommand = vars.slash.getString('action')

        if(!subCommand) {
            return help.run(e, vars, args, commands, "ecoleDirecte", "Note: les serveurs d'école directe sont très long à la détente. Donc si les commandes sont longue à répondre, cela ne vient pas du robot.")
        }

        const doCommand = commands.find(c => {
            if(c.name === subCommand) return true
            if(c.alias) return c.alias.find(a => a === subCommand)
        })
        if(!doCommand) return e.reply({content: "Cette commande n'existe pas!", ephemeral: true})
        
        var mess;
        var reaction;
        function removeReactions() {
            if(!vars.slash && reaction) reaction.users.remove()
            if(mess) mess.delete()
        }
        if(doCommand.needAccount) {
            if(!vars.slash) reaction = await e.react(vars.loadingEmote)
            mess = await e.channel.send("Récupérations des informations du compte de `" + e.member.user.tag + "`...")

            const account = await getAccount(e.member.user)
            if(!account) {
                removeReactions()
                return e.reply("Tu dois être connecté pour utiliser cette commande. Pour ce faire, utilise la commande `" + vars.options.prefix + "ecoleDirecte login`!")
            }
            else vars.account = account
        }

        await doCommand.run(e, vars, args)
        return removeReactions()
    }
}
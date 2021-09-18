const help = require('./help')
const {getAccount, reloadAccount} = require('./_ed/_manageAccounts')
module.exports = {
    name: "ecoleDirecte",
    active: true,
    alias: [
        "ed"
    ],
    description: "Récuperez vos devoirs, la vie scolaire et pleins d'autre choses grâce à cette commande!",
    required: "./commands/_ed",
    type: 1,
    run: async (e, vars, args) => {
        const commands  = vars.files

        if(!args.length) {
            return help.run(e, vars, args, commands, "ecoleDirecte")
        }

        const command = args.shift()
        const doCommand = commands.find(c => {
            if(c.name === command) return true
            if(c.alias) return c.alias.find(a => a === command)
        })
        if(!doCommand) return e.reply("Cette commande n'existe pas!")

        if(doCommand.needAccount) {
            const account = await getAccount(e.author)
            if(!account) return e.reply("Tu dois être connecté pour utiliser cette commande. Pour ce faire, utilise la commande `" + vars.options.prefix + "ecoleDirecte login`!")
            else vars.account = account
        }

        return doCommand.run(e, vars, args)
    }
}
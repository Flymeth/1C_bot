module.exports = {
    name: "notes",
    description: "Affiche toutes tes notes!",
    active: true,
    needAccount: true,
    run: async(e, vars, args) => {
        
        return e.reply({content: "En cour de développement!", ephemeral: true})
        
        // const {account} = vars
        // const {data} = await vars.ecoledirecte.getNotes(account.token, account.ecoledirecte.id)

        // for(let id in data.periodes) {
        //     console.log(data.periodes[id].ensembleMatieres.disciplines);
        // }
    }
}
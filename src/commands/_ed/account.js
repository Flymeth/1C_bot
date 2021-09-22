module.exports = {
    name: "account",
    description: "Affiche les informations de ton compte ecoleDirecte!",
    active: true,
    needAccount: true,
    run: async(e, vars, args) => {
        const {ecoledirecte} = vars.account

        const accountType = {
            "E": "Eleve",
            "P": "Professeur"
        }

        const embed = new vars.discord.MessageEmbed()
        .setColor(ecoledirecte.couleurAgendaEtablissement || vars.colors.user || vars.colors.bot || "RANDOM")
        .setTitle(`Compte de ${ecoledirecte.profile.sexe}. ${ecoledirecte.prenom} ${ecoledirecte.nom}:`)
        .setThumbnail(`https:${ecoledirecte.profile.photo}`)
        .setImage('https:' + ecoledirecte.profile.photo)
        .addField('Etablissement:', ecoledirecte.nomEtablissement)
        .addField('Type de compte:', accountType[ecoledirecte.typeCompte])
        .addField('Classe:', ecoledirecte.profile.classe.libelle)
        .addField('Cantine:', ecoledirecte.modules.find(m => m.code === "RESERVATIONS").params.regime)
        
        return e.reply({embeds: [embed]})
    }
}
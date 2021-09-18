module.exports = {
    name: "ready",
    active: true,
    run: (e, vars) => {
        console.log("Connecté en tant que " + vars.client.user.tag);
        vars.client.user.setActivity("mentionnez-moi pour obtenir mon préfix!", {type: "WATCHING"})
    }
}
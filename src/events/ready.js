module.exports = {
    name: "ready",
    active: true,
    run: async (e, vars) => {
        console.log("Connecté en tant que " + vars.client.user.tag);
        vars.client.user.setActivity("mentionnez-moi pour obtenir mon préfix!", {type: "WATCHING"})

        // set discord slash commands

        const existingCommands = await vars.client.application.commands.fetch()

        for(let cmd of vars.commands) {

            const json = {
                name: cmd.name,
                type: cmd.type, 
                options: cmd.options
            }
            if(cmd.type !== 3) json.description = cmd.description

            const cmdExist = existingCommands.find(c => c.name === cmd.name)

            if(cmdExist) {
                var slashCommand = await vars.client.application.commands.edit(cmdExist, json)
                console.log("Edited command: " + slashCommand.name);
            }else {
                var slashCommand = await vars.client.application.commands.create(json)
                console.log("Posted command: " + slashCommand.name);
            }
        }
    }
}
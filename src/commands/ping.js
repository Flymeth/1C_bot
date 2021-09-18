module.exports = {
    name: "ping",
    active: true,
    description: "Faite cette commande pour en connaitre plus sur moi!",
    type: 1,
    run: (e, vars, args) => {
        return e.channel.send("Pong! 🏓 (`" + vars.client.ws.ping + "ms`)")
    }
}
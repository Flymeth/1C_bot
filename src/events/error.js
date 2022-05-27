module.exports = {
    name: "error",
    active: true,
    run: async (e, vars) => {
        console.log("Client error: ", e)
    }
}
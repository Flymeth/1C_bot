const fs = require('fs')
const ed = require('api-ecoledirecte-france')

/**
 * 
 * @param {Object} vars vars
 * @param {Object} account account
 * @param {Object} user user
 * @returns true if it save, an error msg else (string)
 */
function saveAccount(vars, identifiant, mdp, user) {
    const accounts = require('./_accounts.json')

    const userID = user.id
    const existAccount = accounts.find(a => (a.ecoledirecte.identifiant === identifiant && a.ecoledirecte.mdp === mdp))

    let txtEnd = ""

    const obj = {
        discord: user.id,
        ecoledirecte: {
            identifiant,
            mdp
        },
    }

    if(existAccount && existAccount.discord !== userID) {
        const accountUser = vars.client.users.cache.get(existAccount.discord)
        return "`" + accountUser.tag + "` est déjà connecté à ce compte. Si c'est ton compte, sache qu'il est possible de le déconnecter. Pour cela, informe moi de cette erreur avec la commande `" + vars.options.prefix + "report <message>`!\nJe te contacterai si nécessaire."
    }else if(existAccount && existAccount.discord === userID) {
        txtEnd = "Tu es déjà connecté à ce compte!"
    }else accounts.push(obj)

    fs.writeFileSync('./src/commands/_ed/_accounts.json', JSON.stringify(accounts))

    return txtEnd || true
}

/**
 * 
 * @param {Object} vars vars
 * @param {Object} user user
 * @returns true if it save, an error msg else (string)
 */
function resetAccount(user) {
    const accounts = require('./_accounts.json')

    const userID = user.id
    const existAccount = accounts.find(a => a.discord === userID)

    if(!existAccount) {
        return "Compte introuvable."
    }

    accounts.splice(accounts.indexOf(existAccount), 1)

    fs.writeFileSync('./src/commands/_ed/_accounts.json', JSON.stringify(accounts))

    return true
}

/**
 * 
 * @param {Object} user the user
 * @returns false if this user doesn't have account and the account object else
 */
async function getAccount(user) {
    const account = require('./_accounts.json').find(a => a.discord === user.id)
    if(!account) return false
    else return {
        discord: account.discord,
        ecoledirecte: (await ed.accounts(account.ecoledirecte.identifiant, account.ecoledirecte.mdp))[0],
        token: await ed.login(account.ecoledirecte.identifiant, account.ecoledirecte.mdp)
    }
}

module.exports = {
    saveAccount,
    resetAccount,
    getAccount
}
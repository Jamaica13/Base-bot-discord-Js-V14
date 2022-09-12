const Discord = require("discord.js")
const loadSlashCommand = require ("../Loaders/loadSlashCommands")

module.exports = async bot => {

    await loadSlashCommand(bot)

    console.log(` rLife Bot est bien en ligne !`)
    bot.user.setActivity(`Vive le dev`, { type: Discord.ActivityType.Watching })
    bot.user.setStatus("dnd");

}
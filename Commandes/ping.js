const { EmbedBuilder } = require('discord.js');


module.exports = {

    name: "ping",
    description:"Affiche la latence",
    permission: "Aucune",
    dm: true,
    category: "Information",

    async run(bot, message, args) {

    let embeeed = new EmbedBuilder()
    embeeed.addFields(
    {name: "Ping", value: `Calcule en cours`, inline: true},
    {name: "Latance", value: `${bot.ws.ping}ms`, inline: true},
    )
      
    let msg = await message.channel.send({embeds: [embeeed]})
    let embed = new EmbedBuilder()
    embed.addFields(
    {name: "Ping", value: `${msg.createdAt - message.createdAt + "ms"}`, inline: true},
    {name: "Latance", value: `${bot.ws.ping}ms`, inline: true},
    )
     
    return msg.edit({embeds: [embed]})
    }
}
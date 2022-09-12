const Discord = require("discord.js")


module.exports = {
    
    name: "unban",
    description: "permet de unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Administareur",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur a unban",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du débannissement",
            required: true,
        }
    ],

    async run(bot, message, args) {

        // try {

            let user = args.getUser("utilisateur")
            if(!user) return message.channel.send("Pas d'utilisateur !")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie .";

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.channel.send("Cette utilisateur n'est pas banni !")

            try {await user.send(`Tu as été unban par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

            await message.channel.send(`${message.user} a unban ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.members.unban(user, reason)

        // } catch (err) {
            
        //    return message.channel.send("Pas d'utilisateur ! ")
        // }
    }
}
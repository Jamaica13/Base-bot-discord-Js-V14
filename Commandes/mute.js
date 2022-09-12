const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description:"Mute une membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Administareur",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a mute",
            required: true,
        }, {
            type: "string", 
            name: "temps",
            description: "Le temps du mute",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du mute",
            required: true,
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.channel.send("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.channel.send("Pas de membre !")

        let time = args.getString("temps")
        if(!time) return message.channel.send("Pas de temps !")
        if(isNaN(ms(time))) return message.channel.send("Pas le bon format !")
        if(ms(time) > 2419200000) return message.channel.send("Le mute ne peut pas durer plus de 28 jours !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(message.user.id === user.id) return message.channel.send("Ne te mute pas tout seul !")
        if((await message.guild.fetchOwner()).id === user.id) return message.channel.send("Ne mute pas le propriétaire du serveur !")
        if(!member.moderatable) return message.channel.send("Je ne peux pas mute ce membre !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.channel.send("Tu ne peux pas mute ce membre !")
        if(member.isCommunicationDisabled()) return message.channel.send("Ce membre est déja mute !")

        try {await user.send(`Tu as été mute ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison :\`${reason}\``)} catch(err) {}

     await message.channel.send(`${message.user} a mute ${user.tag} pendant ${time} pour la raison :\`${reason}\``)
        
    await member.timeout(ms(time)), reason
    }
}
const Discord = require("discord.js")


module.exports = {
    
    name: "kick",
    description: "permet de kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Administareur",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre a kick",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: true,
        }
    ],
    async run(bot, message, args) {

    let user = args.getUser("membre")
    if(!user) return message.channel.send("Pas de membre a kick !")
    let member = message.guild.members.cache.get(user.id)
    if(!member) return message.channel.send("Pas de membre a kick !")
        
    let reason = args.get("raison").value;
    if(!user) reason = "Pas de raison fournie.";

    if(message.user.id === user.id) return message.channel.send("Essai pas de te kick !")
    if((await message.guild.fetchOwner()).id === user.id) return message.channel.send("Ne kick pas le propriétaire du serveur")
    if(member && !member.kickable) return message.channel.send("Je ne peux pas kick ce membre !")
    if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.channel.send("Tu ne peux pas kick ce membre !")

    try {await user.send(`Tu as été kick ${message.guild.name} par ${message.user.tag} pour la raison :\`${reason}\``)} catch(err) {}

     await message.channel.send(`${message.user} a kick ${user.tag} pour la raison :\`${reason}\``)
        
    await member.kick(reason)

    

    }
}
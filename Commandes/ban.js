const Discord = require("discord.js")


module.exports = {
    
    name: "ban",
    description: "permet de bannir un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Administareur",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre a bannir",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du bannissement",
            required: true,
        }
    ],
    async run(bot, message, args) {


        try {

        let user = await bot.users.fetch(args._hoistedOptions[0].value)
        if(!user) return message.channel.send("Pas de membre a bannir !")
        let member = message.guild.members.cache.get(user.id)
        
        let reason = args.get("raison").value;
        if(!user) reason = "Pas de raison fournie.";

        if(message.user.id === user.id) return message.channel.send("Essai pas de te bannir !")
        if((await message.guild.fetchOwner()).id === user.id) return message.channel.send("Ne ban pas le propriétaire du serveur")
        if(member && !member.bannable) return message.channel.send("Je ne peux pas bannir ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.channel.send("Tu ne peux pas bannir ce membre !")
        if((await message.guild.bans.fetch()).get(user.id)) return message.channel.send("Ce membre est déja ban !")

        try {await user.send(`Tu as été banni ${message.guild.name} par ${message.user.tag} pour la raison :\`${reason}\``)} catch(err) {}

        await message.channel.send(`${message.user} a ban ${user.tag} pour la raison :\`${reason}\``)
        
        await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            return message.channel.send("Pas de membre a bannir !")
        }

    }
}
const Discord = require("discord.js")
const { EmbedBuilder } = require('discord.js');

module.exports = ({

    name: "clear",
    description: "Permet de supprimer un nombre de messages",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Administareur",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Nombre",
            required: true,
        }
    ],

    async run(bot, message, args, db) {
        const erreur = new EmbedBuilder()
        .setTitle("**Une erreur est survenu ! **")
        .setDescription("**Veuillez indiquer un nombre __entre__ __`0`__ et __`100`__ !**")
        .setColor("#2f3136");

        try {

            let number = args[0] || args._hoistedOptions[0].value
            if(isNaN(number)) return message.channel.send({embeds: [erreur]})
            if(parseInt(number) <= 0 || parseInt(number) > 100) return message.channel.send({embeds: [erreur]})

            try {await message.delete()} catch (err) {}

            message.channel.bulkDelete(number).catch(async err => {
                console.log(err)
                if(err) return message.channel.send({embeds: [erreurDeux]})

            }).then(async msg => {

                try {
                    await message.channel.send(`${message.author === undefined ? message.user : message.author} a supprimé \`${msg.size}\` messages avec succès !`)
                } catch (err) {
                    await message.channel.send(`${message.author === undefined ? message.user : message.author} a supprimé \`${msg.size}\` messages avec succès !. Copyright déposé - bot crée par Jamaica`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                }
            })

        } catch (err) {

            return message.channel.send({embeds: [erreur]})
        }
    }
})
function newFunction() {
    const erreur = new EmbedBuilder()
        .setTitle("**Une erreur est survenu ! **")
        .setDescription("**Veuillez indiquer un nombre __entre__ __`0`__ et __`100`__ !**")
        .setColor("#2f3136");

    const erreurDeux = new EmbedBuilder()
        .setTitle("**Une erreur est survenu ! **")
        .setDescription("**Les messages __datent de plus de 14 jours__ !**")
        .setColor("#2f3136");
    return { erreur, erreurDeux };
}
const discord = require('discord.js');

exports.run = (client, message, args, ops) => {

    if(!args[0]){
        var embed = new discord.RichEmbed()
            .setTitle("__Liste des informations :__")
            .addField("Préfix", "Le préfixe actuel est : **" + ops.prefix + "**")
            .addField("Autorole", "L'autorôle est configuré sur : **" + ops.autoroles + "**", true)
            .setColor(0xf44242)
            .setThumbnail("https://cdn.discordapp.com/attachments/418027455719407627/486979032815239168/redemption.jpg")
        message.channel.sendEmbed(embed);
    }

}

const discord = require('discord.js');

exports.run = (client, message, args, ops) => {
    if(!args[0]){
        var embed = new discord.RichEmbed()
            .setTitle("__Liste des commandes :__")
            .addField(ops.prefix + "play {arg}", "Jouer une musique/vidéo.")
            .addField(ops.prefix + "search {arg}", "Faire une recherche avancé sur youtube.")
            .addField(ops.prefix + "leave", "Faire quitter le bot.")
            .addField(ops.prefix + "pause", "Mettre en pause la musique.")
            .addField(ops.prefix + "resume", "Relancer la lecture de la musique.")
            .addField(ops.prefix + "queue", "Afficher la file d'attente.")
            .addField(ops.prefix + "skip", "Passer à la musique suivante.")
            .addField(ops.prefix + "volume", "Changer le volume de la musique.")
            .addField(ops.prefix + "reload {cmd}", "Permet de reload une commande.")
            .addField(ops.prefix + "ping", "Surprise.")
            .setColor(0xf44242)
            .setThumbnail("https://cdn.discordapp.com/attachments/418027455719407627/486979032815239168/redemption.jpg")
        message.channel.sendEmbed(embed);
    }
}

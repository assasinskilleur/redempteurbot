exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send("Il y a aucune musique actuellement.");
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Vous devez être dans le même salon que le bot.");
    if(fetched.dispatcher.paused) return message.channel.send("La musique est déjà en pause.");
    fetched.dispatcher.pause();
    message.channel.send(`**${fetched.queue[0].songTitle}** a été mit en pause.`);
}

exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("Il y a aucune musique actuellement.");
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Vous devez être dans le même salon que le bot.");
    if(isNaN(args[0]) ||args[0] > 200 || args[0] < 0) return message.channel.send('Veuillez saisir un chiffre entre 0-200');

    fetched.dispatcher.setVolume(args[0]/100);
    message.channel.send(`Le volume de ${fetched.queue[0].songTitle} a été mit a ${args[0]}`);
}

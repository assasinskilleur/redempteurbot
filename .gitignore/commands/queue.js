exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send("Il y a aucune musique actuellement.");
    let queue = fetched.queue;
    let nowPlaying = queue[0];
    let resp = `__**Actuel :**__\n**${nowPlaying.songTitle}** -- **Demandé par:** *${nowPlaying.requesterName}* \n\n__**Queue :**__\n`;

    for(var i = 1; i < queue.length; i++){
        resp += `${i}. **${queue[i].songTitle}** -- **Demandé par:** *${queue[i].requesterName}*\n`;
    }

    message.channel.send(resp);
}

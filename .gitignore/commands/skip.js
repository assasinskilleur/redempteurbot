exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    let djrole = message.guild.roles.find("name", "DJ");


    if(!fetched) return message.channel.send("Il n'y a pas de musique dans la file d'attente.");
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Désolé vous n'êtes pas dans le même salon que le bot.");

    if(message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
        message.channel.send(":fast_forward: ***Skip***");
        return fetched.dispatcher.emit("end");
    }else if(message.member.roles.has(djrole.id)) {
        message.channel.send(":fast_forward: ***Skip***");
        return fetched.dispatcher.emit("end");
    }

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount/2);
    if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
    if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Vous avez déjà voté pour passer la musique. ${fetched.queue[0].voteSkips.length}/${required} Vote`);

    fetched.queue[0].voteSkips.push(message.member.id);
    ops.active.set(message.guild.id, fetched);
    if(fetched.queue[0].voteSkips.length >= required){
        message.channel.send(":fast_forward: ***Skip***");
        return fetched.dispatcher.emit("end");
    }

    message.channel.send(`Vous avez voté pour passer la musique : ${fetched.queue[0].voteSkips.length}/${required} Vote.`);

}

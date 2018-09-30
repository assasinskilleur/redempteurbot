exports.run = (client, message, args, ops) => {
    if(!message.member.voiceChannel) return message.channel.send('Vous devez être dans le même salon que le bot.');
    if(!message.guild.me.voiceChannel) return message.channel.send('Je suis déjà parti.');
    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Vous devez être dans le même salon que le bot.");

    message.guild.me.voiceChannel.leave();
    message.channel.send('Je pars..');
}

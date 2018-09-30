const ytdl = require('ytdl-core');
const search = require('yt-search');

exports.run = async (client, message, args, ops) => {
    if(!message.member.voiceChannel) return message.channel.send('Vous devez être dans un channel vocal.');

    if(!args[0]) return message.channel.send('Veuillez préciser la musique/vidéo que vous voulez écouter.');

    let validate = await ytdl.validateURL(args[0]);
    if(!validate) {
        search(args.join(' '), function(err, res) {
            if(err) return message.channel.send("Il y a eu un problème.");
    
            let videos = res.videos;
            let firstResult = videos[0];
            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [firstResult.url], ops);
        });
        return;
    }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.queue.push({
        songTitle: info.title,
        requester: message.author.id,
        requesterName: message.author.tag,
        url: args[0],
        annouceChannel: message.channel.id
    });

    if(!data.dispatcher) play(client, ops, data);
    else{
        message.channel.send(`__**Ajouté à la file d'attente**__ :musical_note: : ${info.title} | Demandé par : ${message.author.tag}`)
    }

    ops.active.set(message.guild.id, data);
}

async function play(client, ops, data) {
    client.channels.get(data.queue[0].annouceChannel).send(`__**Ecoute**__ :notes: : ${data.queue[0].songTitle} | Demandé par ${data.queue[0].requesterName}`);
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function(){
        finish(client, ops, this);
    });
}

function finish(client, ops, dispatcher){
    let fetched = ops.active.get(dispatcher.guildID);
    fetched.queue.shift();
    if(fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client, ops, fetched);
    }else{
        setTimeout(function(){
            ops.active.delete(dispatcher.guildID);
            let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
            if(vc) vc.leave();
        }, 300000);
    }
}

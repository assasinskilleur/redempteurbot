exports.run = (client, message, args, ops) => {
    if(message.author.id !== ops.ownerID) return message.channel.send('Désoler seul le créateur du bot peut utiliser cette commande.');

    try{
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    }catch (e){
        return message.channel.send(`Impossible de reload : ${args[0]}`);
    }

    message.channel.send(`Le reload de : ${args[0]} a été reussi avec succes.`);
}

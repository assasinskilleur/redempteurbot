const fs = require('fs');

exports.run = (client, message, args, ops) => {
    if(!args[0]) return message.channel.send('Veuillez saisir un préfix valide.');
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Vous ne disposez pas des droits suffisants.");

    let prefixs = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));

    prefixs[message.guild.id] = {
        prefixs: args[0]
    }

    fs.writeFile("./prefix.json", JSON.stringify(prefixs), (err) => {
        if(err) console.log(err);
    });

    message.channel.send(`Le préfix a été réglé sur : ${args[0]}`);
}

const Discord = require("discord.js");
const { receiveMessageOnPort } = require("worker_threads");

const Client = new Discord.Client;

const prefix = "-";

Client.on("ready", () => {
    console.log("bot est pret");
});


Client.on("guildMemberAdd", member => {
    console.log("un nouveau membre est arrive");
    member.guild.channels.cache.find(channel => channel.id === "786209984995262485").send("** Bienvenue à **" + member.displayName + " ** toi dans le discord :wink:!\n Nous sommes desormais **"  + member.guild.memberCount +  "** sur le serveur **");
    member.roles.add("786212192919355432").then(mbr => {
        console.log("le role à etait mis à " + member.displayName);
    }).catch(() => {
        console.log("le role à pas pue etre mis");
    });   
});

Client.on("guildMemberRemove", member => {
    console.log("Il est partie");
    member.guild.channels.cache.find(channel => channel.id === "786209984995262485").send(member.displayName + "** est partie du discord :sob:**");
});

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;

    console.log("la reaction est ajouter part " + user.username + " \n nom de l'emojie " + reaction.emoji.name);

    
    /*reaction.users.remove(user.id).then(react => {
        console.log(" reaction " + react.emoji.name + " retire part le bot ");
    }).catch(err => {
        console.log("impossible de retire la reaction :" + err);
    });*/

    reaction.remove().then(react => {
        console.log(" reaction " + react.emoji.name + " retire part le bot ");
    }).catch(err => {
        console.log("impossible de retire la reaction :" + err);
    });
});

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;

    console.log(" la reaction est retire part " + user.username + " \n nom de l'emojie " + reaction.emoji.name); 
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "twitch"){
        message.reply(" **@everyone yop les potes, Je suis en live sur ma chaine Twitch https://www.twitch.tv/leparigo ! Hesite pas venir me regarde** ")
    }

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply(" **Membre non ou mal mentionné.** ");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " **à été bannie avec succés.** ");
                }
                else { 
                    message.reply(" **Impossible de bannir ce membre.** ");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply(" **Membre non ou mal mentionné.** ");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.reply(mention.displayName + " **à été kick avec succés.** ");
                }
                else {
                    message.reply(" **Impossible de kick ce membre.** ");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

           if(mention == undefined){
               message.reply(" **Menbre non ou mal mentionné** ");
           }
           else {
               mention.roles.add("798515266676850718");
               message.reply(mention.displayName + " **mute avec succés.** ");
           }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention ==undefined){
                message.reply(" **Membre non ou mal mentionné.** ");
            }
            else {
                mention.roles.remove("798515266676850718");
                message.reply(mention.displayName + " **Unmute avec succés.** ");
            }

        }
        
        
    }
    
});
Client.login("Nzk4MjY1NDIzNzc4NDE0NTky.X_ygnA.YpMxpQ9nnTVcALhHtvx2XtCAF7w");
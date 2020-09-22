const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json')

client.on("ready", () => {
    console.log(`${client.user.tag} is online!`)
    client.generateInvite('ADMINISTRATOR')
  .then(link => console.log(`Generated bot invite link: ${link}`)).catch(console.error);
});

client.on('message', async message => { 
    if (message.channel.type === 'dm') return;
    if (message.author.bot) return;

    let target = message.mentions.members.first();
    if(message.content === `${prefix}votekick ${target}`) {
       await message.channel.send(`A votekick for ${target} has been created! VOTE!`);

        message.react('👍')
        message.react('👎');

message.awaitReactions((reaction, user) => user.id == reaction.users.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
        { max: 8, time: 30000 }).then(collected => {
            let a = collected.emoji.name == '👍';
            let b = collected.first().emoji.name == '👎';
                if (a.size > b.size) {
                        message.channel.send('Vote Successful');
                        guild.member(target).setVoiceChannel(755956322989768828);
                } else if(a.size < b.size) {
                    message.channel.send('Vote Failed')
                }
                else
                        message.channel.send('Votes were equal');
        }).catch((e) => {
                message.channel.send(`There was an error! ${e}`);
        });
    }
});

client.login(token);

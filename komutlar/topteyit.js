const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, member) => {
  
if(!message.member.roles.cache.some(r => ['807869072972054528'].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new dc.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  
  let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}.toplam`);
let yazı = "Hermes Teyit Listesi"
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`yetkili.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("#38ff3d").setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top));
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit", "tt", "teyit", "top-teyit"],
    permLevel: 0
};

exports.help = {
    name: "topteyit"
}
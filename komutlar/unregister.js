const Discord = require("discord.js");
exports.run = (client, message, args) => {
  if (!message.member.roles.cache.has("807869072972054528"))
    if (!message.member.roles.cache.has("807869072917528584"))
      return message.reply("Bunun için gerekli iznin yok");
  var role = message.guild.roles.cache.find(role => role.id === "807869072917528584");
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user)
    return message
      .reply("**Kime Unregister Rolü Verceğimi Yazmadın**") // Buzz
      .catch(console.error);
  user.roles.add(role); ///Buzz
  const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL) /// Buzzz
    .setDescription(
      `**__Unregister   Rolü Verildi __**`
    )
    .addField(
      `__Yetki Veren Kişi__`,
      `<@!${message.author.id}>` ///Buzz
    )
    .addField(`__Verilen Kişi__`, `${user}`)
    .addField(`__Verilen Yetki__`, `${role}`)
    .setImage(
      ``
    )
    .setFooter(client.user.username, client.user.avatarURL)
    .setColor("#661d68")
    .setTimestamp();
  message.channel.send(embed).then(m => m.delete(9000))
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unreg"],
  permLevel: 0
};

exports.help = {
  name: "unregister",
  description: "İstediğiniz kişiyi vip rolü verir.",
  usage: "vip-ver [kullanıcı]"
};

///ES

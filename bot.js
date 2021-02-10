const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags')
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token)

//-----------------------GİRENE-ROL-VERME----------------------\\

client.on("guildMemberAdd", member => {
  member.roles.add('807869072917528584'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\

//------------------------HOŞGELDİN-MESAJI-----------------------\\ 

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
'0': `<a:sifir:807973228629983233>`,
'1': `<a:bir:807973222565412884>`,
'2': `<a:iki:807973230492909578>`,
'3': `<a:uc:807973227690721310>`,
'4': `<a:dort:807973229893255188>`,                       
'5': `<a:bes:807973222041649193>`,
'6': `<a:alti:807973221013913620>`,
'7': `<a:yedi:807973230496317472>`,
'8': `<a:sekiz:807973230765801483>`,
'9': `<a:dokuz:807973223358660608>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "807869073018585121");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = '<a:gvenilirdeil:807999044273700895> Hesap Durumu: Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = '<a:gvenilir:807999044227170325> Hesap Durumu: Güvenilir Gözüküyor.'
    moment.locale("tr");

    kanal.send(`**
\`˃\` <a:bit:808000154719748107> Kriyos'a Hoş Geldin <@`+ member + `>, Hesabın \``+gecen+`\` Tarihinde Oluşturulmuş Ve `+kontrol+` 

     \`˃\` <a:bekle:807973819641757716> Kayıt Olmak İçin \`Ψ Gates of Ocean\` Odalarına Geçip <@&807869072972054528> Yetkili Arkadaşlarımıza Teyit Vererek Kayıt Olabilirsin.

          \`˃\` <a:moralev:807973819036991508> Sunucumuz \`Ψ\` Tagını Kullanıcı Adına Ekleyerek Ailemize Katılabilirsin.

     \`˃\` <a:tac:807973818542719057> Seninle Beraber Sunucumuz Toplam `+üyesayısı+ ` Kişiye Ulaştı Bizi Şereflendirdin ! 

\`˃\` <a:siyahkalp:807973820124102666> İçerize Keyifli Vakitler Geçirmeni Diler, Sunucumuzun <#807869073454923810> Kısmını Okumanız Çok Güzel Olur.**`)});
  

//------------------------HOŞGELDİN-MESAJI-----------------------\\

//TAG ALANA ROL //

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'Ψ'
  const sunucu = '807869072871915560'
  const kanal = '807869077984641041'
  const rol = '807869072951738370'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!**`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!**`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

//------------------------ŞÜPHELİ-HESAP-----------------------\\

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "807869072917528584") 
     var rol = member.guild.roles.cache.get("807869072938237969") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('**Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.**')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------ŞÜPHELİ-HESAP-----------------------\\

client.on("guildMemberAdd", member => {
member.setNickname(`Ψ İsim | Yaş`) 
}) ;
;

client.on("ready", async function() {
const voiceChannel = "807891624792555530"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})

const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = 'Discord iOS'

client.on("guildMemberAdd", member => {

if(member.user.username.includes("Dâwnê")){
member.roles.add("807869072938237971")
member.roles.add("807869072938237970")
member.roles.remove("807869072917528584")
member.send("**__Sunucumuzun Yasaklı Tagında Bulunuyorsunuz, Şüpheli Kısmına Atıldınız.__**")
}
})
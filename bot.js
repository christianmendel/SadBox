const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

client.on('ready',()=>{
    console.log(`Bot foi iniciado, com ${client.users.size} usuarios, em ${client.channels.size} canais, em ${client.guilds.size} servidores`)
    client.user.setGame(`Eu estou em ${client.guilds.size} servidores`)
})

client.on('guildCreate', guild =>{
    console.log(`Bot entrou no servidor ${guild.name} (id: ${guild.id}). População ${guild.memberCount} membros`)
    client.user.setActivity(`Eu estou em ${client.guilds.size} servidores`)
})

client.on('guildDelete',guild=>{
    console.log(`o bot foi removido do servudor: ${guild.name} (id: ${guild.id})`)
    client.user.setActivity(`Serving ${client.guilds.size} servidores`)
})

client.on('menssage', async message =>{

})

client.login(config.token)
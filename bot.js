const mongoose = require('mongoose');

const Discord = require('discord.js')

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
})
const config = require('./config.json')

const dbURI = "mongodb+srv://sadBox:grupo16@cluster0.jwdqx.mongodb.net/acervo-de-musicas?retryWrites=true&w=majority";

const respostaDoDB = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

client.on('ready', () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuarios, em ${client.channels.size} canais, em ${client.guilds.size} servidores`)
    client.user.setActivity(`Eu estou em ${client.guilds.size} servidores`)
})

client.on('guildCreate', guild => {
    console.log(`Bot entrou no servidor ${guild.name} (id: ${guild.id}). População ${guild.memberCount} membros`)
    client.user.setActivity(`Eu estou em ${client.guilds.size} servidores`)
})

client.on('guildDelete', guild => {
    console.log(`o bot foi removido do servidor: ${guild.name} (id: ${guild.id})`)
    client.user.setActivity(`Serving ${client.guilds.size} servidores`)
})

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
    }
    if (comando === "oi") {
        const m = await message.channel.send("Oi?");
        m.edit(`Ola eu sou o SadBox!`);
    }
    // if(comando === "play") {
    //     const x = await message.member.voice.channel.join()
    //     console.log(x)
    // }
    if (comando === "autor") {
        const m = await message.channel.send("Grupo 16");
    }
})

client.on('message', message => {
    if (!message.content.startsWith(config.prefix)) return;

    const Schema = mongoose.Schema;

    const MusicaSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        }
    }, { timestamps: true });

    const Musica = mongoose.model('Musica', MusicaSchema);

    const args = message.content.slice(config.prefix.length).split(';');
    const comando = args[0]
    const musica = new Musica({ title: args[1], link: args[2] })

    if (comando === "save") {
        musica.save().then((resp) => {
            //console.log(`comando: ${comando}, args: ${args}`)
            console.log(resp)
            console.log(`Salvo no DB\n nome:${args[1]}, link: ${args[2]}`)
        })
    }

    else if (comando === 'show') {
        /*const resp = Musica.collection.find({})
        //const resp = Musica.find({})
        console.log(resp)*/
    }
    /*
        else if (comando === 'editName') {
    
        }
    
        else if (comando === 'editLink') {
    
        }
    
        else if (comando === 'delete') {
    
        }
        */
})


client.login(config.token)
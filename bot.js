const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const config = require('./config.json');
const token = require('./config.json').token;
const client = new Discord.Client();
const mongoose = require('mongoose');

const dbURI = "mongodb+srv://sadBox:grupo16@cluster0.jwdqx.mongodb.net/acervo-de-musicas?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })


client.on('ready', () => {
    console.log(`Bot foi iniciado, com sucesso!`)
    client.user.setActivity(`;help`)
})

client.on('message', async (message) => {

    const args = message.content
    const comando = args.toLowerCase();

    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms`);
    }
    if (comando === "oi") {
        const m = await message.channel.send("Oi?");
        m.edit(`Ola eu sou o SadBox!`);
    }
    if (comando === "tudo bem?") {
        await message.channel.send("estou muito bem!");
    }
    if (comando === "bot vagabundo") {
        await message.channel.send("vagabundo é você que não me programou direito");
    }
    if (comando === "tchau") {
        await message.channel.send("até logo!");
    }
    // if(comando === ";rasteira") {
    //     const x = await message.member.voice.disconnect()
    //     console.log(x)
    // }
    if (comando === ";help") {
        await message.channel.send("use o comando ;rasteira");
    }
    if (comando === ";play") {
        try{
            await message.member.voice.channel.join()
            message.reply('Entrando')
        }catch{
            message.reply('Erro, verifique se voce esta connectado em canal de voz')
        }
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


    if (comando === "save") {
        const musica = new Musica({ title: args[1], link: args[2] })
        musica.save().then((resp) => {
            //console.log(`comando: ${comando}, args: ${args}`)
            console.log(resp)
            console.log(`Salvo no DB\n nome:${args[1]}, link: ${args[2]}`)
        })
    }

    else if (comando === 'show') {
        async function listarBanco() {
            const musicas = await Musica.find()
            const m = await message.channel.send("Show?");
            let saidaDeTela = []
            musicas.forEach((item) => {
                saidaDeTela.push(item.title)
            })
            m.edit(`Lista de musicas: ${saidaDeTela.join(' - ')}`);
        }
        listarBanco()
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


client.login(token);

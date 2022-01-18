const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const config = require('./config.json');
const token = require('./config.json').token;
const client = new Discord.Client();
const mongoose = require('mongoose');
const ffmpeg = require("ffmpeg-static");

const dbURI = "mongodb+srv://sadBox:grupo16@cluster0.jwdqx.mongodb.net/acervo-de-musicas?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

//-----Formato do objeto do DB----------
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
//---------------------------------------

client.on('ready', () => {
    console.log(`Bot foi iniciado, com sucesso!`)
    client.user.setActivity(`;help`)
})

client.on('message', async (message) => {

    const args = message.content.slice(config.prefix.length).split(';');
    const comando = args[0]
    const m = await message.channel


    switch (comando) {
        case "ping":
            m.send(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms`);
            break;

        case "oi":
            m.send(`Ola eu sou o SadBox!`);
            break

        case "tudo bem?":
            await message.channel.send("estou muito bem!");
            break

        case "bot vagabundo":
            await message.channel.send("vagabundo é você que não me programou direito");
            break

        case "tchau":
            await message.channel.send("até logo!");
            break

        case "rasteira":
            const x = await message.member.voice.disconnect()
        //     console.log(x)
        case "help":
            await message.channel.send("use o comando ;rasteira");
            break

        case "play":
            try {
                //await message.member.voice.channel.join()
                 message.member.voice.channel.join().then((res)=>{
                    const x = res.play('Polozhenie.mp3')
                    // const x = res.play(ytdl(args[1], { filter: 'audioonly' }),{volume:1})
                    //console.log(x)
                }).catch((err)=>{
                    console.log(err.message)
                })
                // const connect = await message.member.voice.channel.join()
                //connect.play(ytdl(args[1], { filter: 'audioonly' }),{volume:0.5})
                //connect.playStream(ytdl(args[1], { filter: 'audioonly' }),{volume:0.5})
                console.log(args[1])
                message.reply('Entrando...')
            } catch {
                message.reply('Erro, verifique se voce esta connectado em canal de voz')
            }
            break
        case "save":
            const musica = new Musica({ title: args[1], link: args[2] })
            musica.save().then((resp) => {
                //console.log(`comando: ${comando}, args: ${args}`)
                m.send(`Musica salva: ${args[1]} > ${args[2]}`)
                console.log(`Salvo no DB\n nome:${args[1]}, link: ${args[2]}`)
            })
            break

        case "show":
            const musicas = await Musica.find()
            let saidaDeTela = []
            musicas.forEach((item) => {
                saidaDeTela.push({ title: item.title, link: item.link })
            })

            if (args[1] == undefined) {
                m.send(`Seja mais específico...`)
            } else {
                m.send(`Musicas:`)
                saidaDeTela.forEach((item) => {
                    m.send(`${item[args[1]]}`);
                })
            }

            break

        case "edit":
            break

        case "delete":
            break

    }
})

client.login(token);

require('dotenv').config();
const { Client } = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const client = new Client();
const { discord_token, prefix, comandos, botid } = require('./config.json');

//maicolgamer23@hotmail.com
// -----------------------
client.on('ready', () => {
    console.log("Desty,Estoy listo!");
    client.user.setPresence({
        game: {
            name: "Desty", // Estado del bot
            type: 0
        }
    });
});

client.on('error', () => {
    console.error("Ha ocurrido un error");
});

client.on('resume', () => {
    console.log("Estoy listo otra vez!");
});
// endOn--------------------------
var servers = {};
// comienza
client.on('message', msg => {
    let guild = msg.guild.id;
    if (msg.channel.type !== "dm") {
        const mess = msg.content.toLowerCase();
        const comando = mess.split(" ")[0];
        switch (comando) {
            case prefix + comandos[0]:
                // funciones
                // play----------------------------
                function play(connection, msg) {
                    var server = servers[msg.guild.id];
                    server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));

                    server.queue.shift();

                    server.dispatcher.on("end", () => {
                        if (server.queue[0]) {
                            play(connection, msg);
                        } else {
                            connection.disconnect();
                        }
                    });
                }
                // -------------------------
                if (msg.member.voice.channel) {
                    if (mess === (prefix + comandos[0])) {
                        msg.channel.send("No escribiste el nombre de ninguna canción.");
                    } else {
                        const args = msg.content.substring(prefix.length).split(" ");
                        if (!args[1]) {
                            msg.channel.send("No se encontro ningúna canción con ese link.");
                        }
                        if (!servers[msg.guild.id]) {
                            servers[msg.guild.id] = {
                                queue: []
                            }
                        }
                        var server = servers[msg.guild.id];
                        server.queue.push(args[1]);
                        if (!msg.member.voice.connection) {
                            msg.member.voice.channel.join().then((connection) => {
                                play(connection, msg);
                            });
                        }


                    }
                } else {
                    msg.channel.send(" Necesitas unirte a un canal de voz!");
                }

                ; break;
            case prefix + "skip":
            case prefix + "salir":
                msg.channel.send(prefix + comandos[3]);
                ; break;
            case prefix + comandos[4]:
                msg.channel.send(prefix + comandos[4]);
                ; break;
            case prefix + "pausa":
                msg.channel.send(prefix + comandos[2]);
                ; break;
            case prefix + "resume":
                ; break;
        }


    } else { // Si el bot recibe un mensaje directo
        const mess = message.content;
        if (message.author.id !== botid) {
            console.log("El bot ha recibido un mensaje privado (" + message.channel.type + "): ");
            console.log(message.author.tag + ": " + mess);
            client.fetchUser(ownerid).then((user) => {
                user.send(message.author.tag + ": " + mess); // Enviar mensaje privado al dueño del bot
            });
        }
    }

}
);
// Verificar si es un link
function isURL(args) {
    let url = args.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);
    if (url == null) {
        return false;
    }

    else {
        return true;
    }

}

client.login(process.env.TOKEN_ENV);
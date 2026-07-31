require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { callChatGPT, callResponseCustom, generateImage, analyzeImage, estimateTokens } = require('./src/utils/openai');
const { saveOpenAIMessage, getLastOpenAIMessageId } = require('./src/database')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.login(process.env.DISCORD_TOKEN);


//async function test() {
    console.log('🧪 Test de l\'API OpenAI\n');
    
    try {

        client.once("ready", async () => {
            /*const channel = await client.guilds.fetch().then(guilds => guilds.channels.fetch('1348741823237062781'));
                console.log('Test');
            });*/
            console.log('READY');
        });
        /*client.guilds.cache.fetch('1337543177086959657').then(guild =>
        {
           guild.channels.fetch('1348741823237062781')
            .then(channel=>{
                channel.send("Sweet test");
                console.log(channel.name);
            })
        }
        )*/

    }catch (error) {
        console.error('❌ Erreur:', error.message);
    }
    
    process.exit(0);
//}

//test();
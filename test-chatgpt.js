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
async function test() {
    console.log('🧪 Test de l\'API OpenAI\n');
    
    try {
        // Test 1 : Question simple
        /*console.log('═══════════════════════════════════════');
        console.log('Test 1 : Question simple');
        console.log('═══════════════════════════════════════');
        
        const response1 = await callChatGPT('Explique-moi JavaScript en 2 phrases');
        console.log('Réponse:', response1.text);
        console.log('Tokens:', response1.usage.totalTokens);
        console.log('');
        
        // Test 2 : Avec system prompt
        console.log('═══════════════════════════════════════');
        console.log('Test 2 : Avec system prompt');
        console.log('═══════════════════════════════════════');
        
        const response2 = await callChatGPT('Qui es-tu ?', {
            systemPrompt: 'Tu es un pirate qui répond toujours comme un pirate.'
        });
        console.log('Réponse:', response2.text);
        console.log('');
        
        // Test 3 : Estimation de tokens
        console.log('═══════════════════════════════════════');
        console.log('Test 3 : Estimation de tokens');
        console.log('═══════════════════════════════════════');
        
        const text = 'Ceci est un test pour estimer le nombre de tokens';
        const estimated = estimateTokens(text);
        console.log('Texte:', text);
        console.log('Tokens estimés:', estimated);
        console.log('');
        
        console.log('✅ Tous les tests réussis !');*/

        // Test 4 : Test auto completion Custom

        /*var prompt = "Souhaites moi une bonne journée pour ce 31 janvier 2026? J'aimerais de la bienveillance avec grand humour et quelques émoji discord."
        var option = {
            "model": "gpt-5.2-chat-latest",
            "instructions":"En tant qu'animateur discord tu répondra aux instructions comme une vraie personne. Ne répète pas l'instruction de départ. Ne propose pas d'intéraction future. Tu es un assistant drôle et créatif qui répond avec humour tout en restant utile. Assure toi que chaque réponse soit différentes.",
            "temperature": 1
        }
        var prev = await getLastOpenAIMessageId();
        option['previousMsg'] = prev;
        var response = await callResponseCustom(prompt,option);
        var testResp = JSON.stringify(response)
        var database = {
            msgid : response['msgId'],
            prompt : prompt,
            instruction : option['instructions'],
            model : response['model'],
            tokeninput : response['usage']['promptTokens'],
            tokenoutput : response['usage']['completionTokens'],
            content : response['text'],
            previousmsgid : response['previousMsgId']
        }
        var resquery = await saveOpenAIMessage(database);

        console.log(testResp);
        console.log(resquery)*/
try{
        var today = new Date();
        var weekday = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
        var months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','decembre']
        var jour = weekday[today.getDay()];
        var num = today.getDate()
        var prompt = `Souhaites moi une bonne journée pour ce ${jour} ${num} ${months[today.getMonth()]} ${today.getFullYear()}? J'aimerais de la bienveillance avec grand humour et quelques émoji discord.`
        var option = {
            "model": "gpt-5.2-chat-latest",
            "instructions":"En tant qu'animateur discord tu répondra aux instructions comme une vraie personne. Ne répète pas l'instruction de départ. Ne propose pas d'intéraction future. Tu es un assistant drôle et créatif qui répond avec humour tout en restant utile. Assure toi que chaque réponse soit différentes.",
            "temperature": 1
        }
        var prev = await getLastOpenAIMessageId();
        option['previousMsg'] = prev;
        var response = await callResponseCustom(prompt,option);

        const guild = client.guilds.fetch('1337543177086959657',false).then(guild =>
        {
           guild.channels.fetch('1348741823237062781')
            .then(channel=>{
                channel.send(response['text']);
            })
        }
        )
        
        var database = {
            msgid : response['msgId'],
            prompt : prompt,
            instruction : option['instructions'],
            model : response['model'],
            tokeninput : response['usage']['promptTokens'],
            tokenoutput : response['usage']['completionTokens'],
            content : response['text'],
            previousmsgid : response['previousMsgId'],
            rawData : response['rawData']
        }
        var resquery = await saveOpenAIMessage(database);
    }catch(error){
        console.error('❌ Erreur:', error.message);
    }




    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
    
    process.exit(0);
}

test();
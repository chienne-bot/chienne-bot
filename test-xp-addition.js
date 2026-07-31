require('dotenv').config();
const { addXP, getUserXPInfo, getOrCreateUserXP } = require('./src/database');

async function test() {
    console.log('🧪 Test d\'addition d\'XP...\n');
    
    const testUserId = '123456789012345678'
    const testUsername = 'TestXP';
    
    try {
        // Créer l'utilisateur
        console.log('1. Création de l\'utilisateur...');
        await getOrCreateUserXP(testUserId, testUsername);
        
        // Ajouter 20 XP
        console.log('\n2. Ajout de 20 XP...');
        let result = await addXP(testUserId, testUsername, 20, 'test');
        console.log('   XP Total:', result.user.xp);
        console.log('   Type de xp:', typeof result.user.xp);
        
        // Ajouter encore 30 XP
        console.log('\n3. Ajout de 30 XP...');
        result = await addXP(testUserId, testUsername, 30, 'test');
        console.log('   XP Total:', result.user.xp);
        console.log('   Type de xp:', typeof result.user.xp);
        
        // Ajouter encore 50 XP
        console.log('\n4. Ajout de 50 XP...');
        result = await addXP(testUserId, testUsername, 50, 'test');
        console.log('   XP Total:', result.user.xp);
        console.log('   Type de xp:', typeof result.user.xp);
        
        // Vérifier le total
        console.log('\n5. Vérification finale...');
        const info = await getUserXPInfo(testUserId);
        console.log('   XP Final:', info.xp);
        console.log('   Attendu: 100');
        console.log('   ✅ Test:', info.xp === '100' || info.xp === 100 ? 'RÉUSSI' : 'ÉCHOUÉ');
        
        if (info.xp == 100) {
            console.log('\n✅ L\'addition fonctionne correctement !');
        } else {
            console.log('\n❌ PROBLÈME: XP =', info.xp, 'au lieu de 100');
            console.log('   Type:', typeof info.xp);
        }
        
    } catch (error) {
        console.error('\n❌ ERREUR:', error);
    }
    
    process.exit(0);
}

test();

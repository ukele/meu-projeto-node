const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'app_apex_siorc',
    bearerOnly: true,
    serverUrl: 'http://168.138.129.184:8080/realms/dev/protocol/openid-connect/auth',
    realm: 'dev',
    credentials: {
        secret: 'l9wRjGHviptdAIKlEQTfWaEZNteKjh4u'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Keycloak já inicializado!");
        return _keycloak;
    } else {
        console.log("Inicializando Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

// Adicionando um bloco de código para execução direta
if (require.main === module) {
    console.log('Alô Mundo');
    initKeycloak();
}

module.exports = {
    initKeycloak,
    getKeycloak() {
        if (!_keycloak){
            console.error('Keycloak não foi inicializado!');
        } else {
            console.log('Keycloak está inicializado.');
        }
        return _keycloak;
    }
};


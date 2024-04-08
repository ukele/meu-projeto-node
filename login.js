const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

// Configuração da sessão
let memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'password',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Configuração do Keycloak
let keycloak = new Keycloak({ store: memoryStore }, {
  "realm": "dev",
  "bearer-only": false,
  "auth-server-url": "http://168.138.129.184:8080/realms/dev/protocol/openid-connect/authURL do servidor Keycloak",
  "ssl-required": "external",
  "resource": "app_apex_siorc",
  "credentials": {
    "secret": "l9wRjGHviptdAIKlEQTfWaEZNteKjh4u"
  },
  "confidential-port": 0,
  "policy-enforcer": {}
});

app.use(keycloak.middleware());

// Rota protegida
app.get('/secure', keycloak.protect(), function(req, res) {
  res.send("Você está logado.");
});

// Rota pública
app.get('/', function(req, res) {
  res.send("Página inicial, acesso público.");
});

app.listen(3000, () => {
  console.log('Aplicação rodando na porta 3000');
});

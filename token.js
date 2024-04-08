const fetch = require('node-fetch');

async function getKeycloakToken() {
  const url = 'http://168.138.129.184:8080/realms/dev/protocol/openid-connect/token';
  const clientId = 'app_apex_siorc';
  const clientSecret = 'l9wRjGHviptdAIKlEQTfWaEZNteKjh4u';
  const details = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  };

  const formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody.join("&")
    });

    const data = await response.json();
    console.log('Token:', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error getting token:', error);
  }
}

getKeycloakToken();

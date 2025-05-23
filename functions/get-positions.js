// functions/get-positions.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Haal je Traccar-inloggegevens uit env vars
  const user = process.env.TRACCAR_USER;
  const pass = process.env.TRACCAR_PASS;
  const auth = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');

  try {
    const res = await fetch('https://demo.traccar.org/api/positions', {
      headers: {
        'Authorization': auth,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Traccar responded ${res.status}` })
      };
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

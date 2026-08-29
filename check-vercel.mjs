import https from 'https';

const TOKEN = process.env.VERCEL_TOKEN || '';

const options = {
  hostname: 'api.vercel.com',
  path: '/v6/deployments',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${TOKEN}`
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const deps = json.deployments.slice(0, 3);
    deps.forEach(d => {
      console.log(`Deployment: ${d.name} | State: ${d.state} | Created: ${new Date(d.created).toLocaleString()}`);
      if (d.state === 'ERROR') {
        console.log(`Error URL: ${d.url}`);
      }
    });
  });
});

req.on('error', (e) => console.error(e));
req.end();

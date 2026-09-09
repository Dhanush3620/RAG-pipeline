const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.+)/);
const apiKey = keyMatch ? keyMatch[1].trim() : null;

if (!apiKey) {
  console.error("Key not found");
  process.exit(1);
}

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    if (data.models) {
      console.log(data.models.map(m => m.name).join('\n'));
    } else {
      console.error(data);
    }
  });

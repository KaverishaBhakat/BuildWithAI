import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeProfile, validateProfile } from './normalizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '200kb' }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.post('/api/profile', (request, response) => {
  const profile = request.body ?? {};
  const missing = validateProfile(profile);
  if (missing.length > 0) {
    return response.status(400).json({ error: 'Please complete the highlighted profile areas.', missing });
  }
  return response.json({ profile: normalizeProfile(profile) });
});

app.use((_request, response) => {
  response.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(port, () => {
  console.log(`Opportunity Compass running at http://localhost:${port}`);
});

# Test de la Configuration des Cookies Better Auth

## Problème résolu

Les cookies n'étaient pas envoyés à cause de :
1. **`bodyParser: false`** désactivait le traitement des cookies
2. **`baseURL` incorrect** - pointait vers le frontend au lieu du backend
3. **Configuration des cookies manquante** - pas d'attributs explicites

## Variables d'environnement requises

Créez ou mettez à jour votre fichier `.env` :

```env
# URL du frontend (origine autorisée)
APP_URL=http://localhost:3000

# URL du backend (pour Better Auth)
API_URL=http://localhost:3001

# MongoDB
MONGODB_URL=mongodb://localhost:27017/saas

# Environnement
NODE_ENV=development
```

## Test avec cURL

### 1. Test de connexion
```bash
curl -X POST http://localhost:3001/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt \
  -v
```

**Vérifiez dans la réponse :**
- Header `Set-Cookie` avec `better-auth.session_token`
- Cookie sauvegardé dans `cookies.txt`

### 2. Test de session
```bash
curl http://localhost:3001/api/auth/get-session \
  -H "Origin: http://localhost:3000" \
  -b cookies.txt \
  -v
```

**Doit retourner :** Les informations de session de l'utilisateur connecté

## Test avec le navigateur (DevTools)

### 1. Ouvrir DevTools (F12)

### 2. Onglet Network
- Faire une requête de connexion
- Cliquer sur la requête
- Vérifier les **Response Headers** :
  ```
  Set-Cookie: better-auth.session_token=xxx; Path=/; HttpOnly; SameSite=Lax
  ```

### 3. Onglet Application > Cookies
- Vérifier que le cookie `better-auth.session_token` existe
- **Name:** `better-auth.session_token`
- **Value:** (token JWT)
- **Domain:** `localhost`
- **Path:** `/`
- **HttpOnly:** ✓
- **Secure:** (vide en dev, ✓ en prod)
- **SameSite:** `Lax` (dev) ou `None` (prod)

### 4. Requêtes suivantes
- Vérifier les **Request Headers** :
  ```
  Cookie: better-auth.session_token=xxx
  ```

## Code Frontend

### Avec Fetch API
```typescript
// Connexion
const response = await fetch('http://localhost:3001/api/auth/sign-in/email', {
  method: 'POST',
  credentials: 'include', // CRUCIAL
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});

// Vérifier la session
const session = await fetch('http://localhost:3001/api/auth/get-session', {
  credentials: 'include', // CRUCIAL
});
```

### Avec Axios
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // CRUCIAL
});

// Connexion
await api.post('/api/auth/sign-in/email', { email, password });

// Vérifier la session
const { data } = await api.get('/api/auth/get-session');
```

### Avec Better Auth Client (Recommandé)
```typescript
import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3001',
  credentials: 'include', // CRUCIAL
});

// Connexion
await authClient.signIn.email({ email, password });

// Vérifier la session
const session = await authClient.getSession();
```

## Troubleshooting

### ❌ Cookie non défini après connexion

**Causes possibles :**
1. `credentials: 'include'` manquant côté frontend
2. CORS mal configuré (vérifier `credentials: true`)
3. `APP_URL` ne correspond pas à l'origine du frontend
4. `API_URL` incorrect

**Solution :**
```bash
# Vérifier les variables d'environnement
echo $APP_URL
echo $API_URL

# Redémarrer le serveur
npm run start:dev
```

### ❌ Cookie défini mais pas envoyé

**Causes possibles :**
1. `withCredentials: true` ou `credentials: 'include'` manquant
2. Domaines différents (localhost vs 127.0.0.1)
3. Cookie expiré
4. SameSite trop restrictif

**Solution :**
- Utiliser toujours `localhost` (pas `127.0.0.1`)
- Vérifier que le cookie existe dans DevTools > Application > Cookies
- Vérifier l'expiration du cookie

### ❌ Erreur CORS

**Erreur :**
```
Access to fetch at 'http://localhost:3001/api/auth/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy: The value of the 'Access-Control-Allow-Credentials' header 
in the response is '' which must be 'true' when the request's credentials mode is 'include'.
```

**Solution :**
- Vérifier que `credentials: true` est dans `app.enableCors()`
- Vérifier que `APP_URL` correspond exactement à l'origine du frontend
- Redémarrer le serveur

### ❌ Cookie avec attribut Secure en développement

**Problème :** Le cookie a `Secure` en développement (HTTP)

**Solution :**
```env
NODE_ENV=development
```

Le cookie ne doit PAS avoir `Secure` en développement.

## Vérification finale

✅ **Checklist :**
- [ ] `.env` contient `APP_URL` et `API_URL`
- [ ] CORS activé avec `credentials: true`
- [ ] Frontend utilise `credentials: 'include'` ou `withCredentials: true`
- [ ] Cookie `better-auth.session_token` visible dans DevTools
- [ ] Cookie envoyé dans les requêtes suivantes
- [ ] Session récupérée avec succès

## Production

En production, ajoutez à votre `.env` :
```env
NODE_ENV=production
APP_URL=https://votre-domaine.com
API_URL=https://api.votre-domaine.com
```

Les cookies auront automatiquement :
- `Secure: true`
- `SameSite: None`
- `HttpOnly: true`

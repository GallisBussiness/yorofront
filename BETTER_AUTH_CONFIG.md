# Configuration Better Auth - Session Management

## Problème résolu
La session Better Auth était automatiquement retirée après la connexion à cause de :
1. **Absence de CORS** avec `credentials: true`
2. **Configuration Helmet** trop restrictive
3. **Configuration Better Auth incomplète**

## Modifications apportées

### 1. Configuration CORS (`src/main.ts`)
```typescript
app.enableCors({
  origin: process.env.APP_URL || 'http://localhost:3000',
  credentials: true, // CRUCIAL pour les cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
});
```

### 2. Configuration Helmet (`src/main.ts`)
```typescript
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
```

### 3. Configuration Better Auth (`lib/auth.ts`)
- `baseURL` : URL de base de l'application
- `session.expiresIn` : 7 jours
- `session.updateAge` : Mise à jour toutes les 24h
- `session.cookieCache` : Cache de 5 minutes
- `advanced.useSecureCookies` : Sécurisé en production uniquement

## Configuration Frontend requise

### Avec Fetch API
```typescript
fetch('http://localhost:3001/api/auth/sign-in', {
  method: 'POST',
  credentials: 'include', // IMPORTANT
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});
```

### Avec Axios
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // IMPORTANT
});
```

### Avec Better Auth Client
```typescript
import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include', // IMPORTANT
});
```

## Variables d'environnement

Assurez-vous que votre fichier `.env` contient :
```env
APP_URL=http://localhost:3000
MONGODB_URL=mongodb://localhost:27017/saas
NODE_ENV=development
```

## Vérification

Pour vérifier que la session fonctionne :

1. **Connexion** : Vérifiez que le cookie `better-auth.session_token` est défini
2. **Requêtes suivantes** : Le cookie doit être automatiquement envoyé
3. **DevTools** : 
   - Onglet Application > Cookies
   - Onglet Network > Headers (vérifier `Set-Cookie` et `Cookie`)

## Troubleshooting

### Le cookie n'est pas défini
- Vérifiez que `credentials: true` est dans CORS
- Vérifiez que le frontend utilise `credentials: 'include'`
- Vérifiez que `APP_URL` correspond à l'URL du frontend

### Le cookie est défini mais pas envoyé
- Vérifiez que `withCredentials: true` (Axios) ou `credentials: 'include'` (Fetch)
- Vérifiez que les domaines correspondent (pas de mismatch localhost vs 127.0.0.1)

### Erreur CORS
- Vérifiez que `APP_URL` dans `.env` correspond exactement à l'URL du frontend
- Vérifiez que le frontend et backend sont sur le même domaine ou sous-domaine

## Production

En production, assurez-vous de :
1. Utiliser HTTPS (`useSecureCookies: true` sera activé automatiquement)
2. Configurer `APP_URL` avec votre domaine de production
3. Ajouter votre domaine dans `trustedOrigins`

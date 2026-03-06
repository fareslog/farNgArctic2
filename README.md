# Guide d'installation du projet Suggestions

Ce projet est composé de deux parties :
- **Frontend** : application Angular
- **Backend** : API Node.js/Express avec base de données MySQL

Suivez les étapes ci-dessous pour installer et exécuter l'application complète.

---

## 1. Prérequis

Assurez-vous d'avoir installé sur votre machine :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement fourni avec Node.js)
- [MySQL](https://www.mysql.com/) (version 8 recommandée) ou MariaDB
- [Angular CLI](https://angular.io/cli) (pour exécuter le frontend) : `npm install -g @angular/cli`
- Git (pour cloner les dépôts)

---

## 2. Récupération des sources

### Frontend
```bash
git clone <URL_DU_DEPOT_FRONTEND> suggestions-frontend
cd suggestions-frontend
```

> **Remarque :** remplacez `<URL_DU_DEPOT_FRONTEND>` par l'adresse de votre dépôt Git.

### Backend
Placez le backend dans le même répertoire parent que le frontend (ou séparément, mais ajustez les chemins si nécessaire).

```bash
git clone https://github.com/oussemasellami/backendmysql-sugg.git suggestions-backend
```

Après clonage, vous devriez avoir une arborescence de ce type :

```
vos-projets/
├── suggestions-frontend/   # application Angular
└── suggestions-backend/    # API Node.js
```

---

## 3. Configuration de la base de données

1. Créez une base de données nommée `suggestions_db` (ou le nom que vous préférez, mais il devra correspondre à la configuration du backend).

   ```sql
   CREATE DATABASE suggestions_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Créez la table `suggestions` en exécutant le script SQL suivant :

   ```sql
   CREATE TABLE IF NOT EXISTS suggestions (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       category VARCHAR(100),
       date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       status VARCHAR(50) DEFAULT 'en attente',
       nbLikes INT DEFAULT 0,
       INDEX idx_status (status),
       INDEX idx_category (category),
       INDEX idx_date (date)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   ```

3. Si vous le souhaitez, vous pouvez insérer quelques données de test.

---

## 4. Installation et configuration du backend

1. Ouvrez un terminal dans le dossier `suggestions-backend`.

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez la connexion à la base de données.  
   Le backend utilise généralement un fichier `.env` à la racine.  
   Copiez le fichier d'exemple (s'il existe) :

   ```bash
   cp .env.example .env
   ```

   Éditez le fichier `.env` avec vos paramètres MySQL :

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=suggestions_db
   PORT=3000
   ```

   Adaptez les valeurs selon votre installation.

4. Lancez le serveur backend :

   ```bash
   npm run dev
   ```

   Vous devriez voir un message indiquant que le serveur est démarré sur `http://localhost:3000`.  
   L'API sera accessible à l'URL `http://localhost:3000/suggestions`.

   > **Note :** gardez ce terminal ouvert pendant que vous utilisez l'application.

---

## 5. Installation et lancement du frontend

1. Ouvrez un nouveau terminal dans le dossier `suggestions-frontend`.

2. Installez les dépendances Angular :

   ```bash
   npm install
   ```

3. Vérifiez que l'URL de l'API est correctement configurée dans le fichier d'environnement.  
   Dans `src/environments/environment.ts`, vous devez avoir :

   ```typescript
   export const environment = {
     production: false,
     suggestionUrl: 'http://localhost:3000/suggestions'
   };
   ```

   Si votre backend utilise un port ou une adresse différente, ajustez cette URL.

4. Lancez l'application frontend :

   ```bash
   ng serve
   ```

   Par défaut, l'application sera accessible sur `http://localhost:4200`.

---

## 6. Utilisation de l'application

- Ouvrez votre navigateur à l'adresse `http://localhost:4200`.
- La page d'accueil vous permet de naviguer vers la liste des suggestions.
- Vous pouvez ajouter, modifier, supprimer et "liker" des suggestions.
- Toutes les données sont persistées dans la base de données via l'API.

---

## 7. Résolution des problèmes courants

- **Erreur CORS** : le backend est normalement configuré pour accepter les requêtes depuis `http://localhost:4200`. Si vous rencontrez des problèmes, vérifiez la configuration CORS dans le backend.
- **Connexion à la base de données** : assurez-vous que MySQL est en cours d'exécution et que les paramètres dans `.env` sont corrects.
- **Port déjà utilisé** : si le port 3000 ou 4200 est déjà occupé, modifiez le fichier `.env` (pour le backend) ou lancez `ng serve --port=4201` (pour le frontend).

---

## 8. Structure du projet (frontend)

- `src/app/features/suggestions` : module principal contenant les composants de liste, détail, formulaire.
- `src/app/core/Services/suggestion.service.ts` : service Angular qui communique avec l'API.
- `src/environments/` : fichiers de configuration d'environnement.

---

## 9. Liens utiles

- Dépôt backend : [https://github.com/oussemasellami/backendmysql-sugg.git](https://github.com/oussemasellami/backendmysql-sugg.git)
- Documentation Angular : [https://angular.io/docs](https://angular.io/docs)
- Documentation Express : [https://expressjs.com/](https://expressjs.com/)

---

Bon développement !
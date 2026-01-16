# 📚 Documentation LRAD - Rapid Application Developer

## 🎯 Vue d'ensemble

**LRAD** (Rapid Application Developer) est un outil CLI automatisé qui génère complètement une ressource MVC avec Prisma. Il crée en quelques secondes :
- ✅ Contrôleur CRUD fonctionnel
- ✅ Routes API RESTful
- ✅ Modèle Prisma et migration BD
- ✅ Interface HTML de test interactive

## 🚀 Installation & Configuration

### Prérequis
- Node.js 16+ installé
- npm ou yarn
- Projet Express/Node.js existant
- Prisma configuré

### Installation
Le script est déjà inclus dans le projet. Rendre le script exécutable :

```bash
# Windows (PowerShell)
# Déjà exécutable par défaut via "node lrad.js"

# Linux/Mac
chmod +x lrad.js
```

## 📖 Guide d'utilisation

### Lancer LRAD

```bash
# Méthode 1 : Directe
node lrad.js

# Méthode 2 : Si script exécutable (Linux/Mac)
./lrad.js

# Avec npm package.json
npm run generate
```

### Étapes interactives

1. **Démarrage** : Le menu s'affiche
2. **Entrée du nom** : Entrez le nom de la ressource (ex: `product`, `category`, `comment`)
3. **Génération automatique** : Tous les fichiers sont créés
4. **Résultat** : Confirmation avec liste des fichiers créés

### Exemple concret

```bash
$ node lrad.js

╔════════════════════════════════════════╗
║    RAD - Rapid Application Developer   ║
║   Générateur de ressources MVC-Prisma  ║
╚════════════════════════════════════════╝

📝 Nom de la ressource (ex: product, post, category): product

Génération des fichiers...

✓ Contrôleur créé: src/controllers/ProductController.js
✓ Routes créées: src/routes/productRoutes.js
✓ Interface de test créée: public/product.html
✓ Modèle Prisma ajouté: product
⏳ Génération du client Prisma...
✓ Client Prisma généré
⏳ Création de la migration...
✓ Migration créée et appliquée
✓ Routes intégrées au fichier principal

════════════════════════════════════════
✓ Ressource créée avec succès!
════════════════════════════════════════
```

## 📁 Fichiers générés

### 1. **Contrôleur** → `src/controllers/[ResourceName]Controller.js`
```javascript
class ProductController {
    static async index(req, res)      // GET - Lister tous
    static async show(req, res)       // GET - Détail par ID
    static async create(req, res)     // POST - Créer
    static async update(req, res)     // PUT - Modifier
    static async destroy(req, res)    // DELETE - Supprimer
}
```

**Endpoints générés :**
| Méthode | Route | Action |
|---------|-------|--------|
| GET | `/api/v1/products` | Lister tous les produits |
| GET | `/api/v1/products/:id` | Récupérer un produit |
| POST | `/api/v1/products` | Créer un produit |
| PUT | `/api/v1/products/:id` | Modifier un produit |
| DELETE | `/api/v1/products/:id` | Supprimer un produit |

### 2. **Routes** → `src/routes/productRoutes.js`
```javascript
// Routes avec swagger documentées
router.get(`${API_PREFIX}/products`, ProductController.index);
router.get(`${API_PREFIX}/products/:id`, ProductController.show);
// ... etc
```

### 3. **Modèle Prisma** → `prisma/schema.prisma` (ajouté)
```prisma
model product {
  id        Int      @id @unique(map: "id_UNIQUE") @default(autoincrement())
  name      String   @db.VarChar(255)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. **Interface de test** → `public/product.html`
Interface web interactive pour tester tous les endpoints CRUD

### 5. **Migration Prisma** → `prisma/migrations/[timestamp]_create_product_table/`
Crée automatiquement la table en base de données

### 6. **Routes intégrées** → `src/routes/routes.js` (modifié)
```javascript
import ProductController from '../controllers/ProductController.js';

// Routes auto-intégrées
router.get(`${API_PREFIX}/products`, ProductController.index);
// ... etc
```

## 🧪 Tester une ressource générée

### Option 1 : Interface web (Recommandé)
```
http://localhost:3000/[resourcename].html
```
Exemple : `http://localhost:3000/product.html`

**Fonctionnalités :**
- ✅ Boutons pour chaque opération CRUD
- ✅ Champs d'entrée pré-remplis
- ✅ Résultats formatés en JSON
- ✅ Gestion des erreurs

### Option 2 : cURL
```bash
# Lister
curl http://localhost:3000/api/v1/products

# Créer
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Mon produit"}'

# Récupérer un
curl http://localhost:3000/api/v1/products/1

# Modifier
curl -X PUT http://localhost:3000/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Nom modifié"}'

# Supprimer
curl -X DELETE http://localhost:3000/api/v1/products/1
```

### Option 3 : Postman
1. Créer une nouvelle collection
2. Ajouter les 5 requêtes CRUD
3. Utiliser `{{base_url}}/api/v1/products`

## 🔧 Processus automatisé

```
┌─────────────────────────┐
│  Saisie du nom (User)   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Création Contrôleur     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Création Routes CRUD    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Création HTML Test      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Ajout Modèle Prisma     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Génération Client Prisma│
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Migration Automatique BD│
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Intégration Routes      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ ✅ Ressource prête!     │
└─────────────────────────┘
```

## 📋 Format des données

### Structure par défaut
Chaque ressource générée a cette structure :

```json
{
  "id": 1,
  "name": "Exemple",
  "createdAt": "2026-01-16T12:34:56.789Z",
  "updatedAt": "2026-01-16T12:34:56.789Z"
}
```

### Créer une ressource
```json
POST /api/v1/products
{
  "name": "Mon produit"
}
```

### Modifier une ressource
```json
PUT /api/v1/products/1
{
  "name": "Nouveau nom"
}
```

## ⚙️ Configuration

### Variables d'environnement
```bash
# .env
API_VERSION=v1  # Contrôle la version de l'API
DATABASE_URL="postgresql://user:password@localhost:5432/db"
```

### Personnaliser le schéma
Après génération, modifier `prisma/schema.prisma` pour ajouter des champs :

```prisma
model product {
  id          Int     @id @default(autoincrement())
  name        String  @db.VarChar(255)
  description String? @db.Text
  price       Float
  stock       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Puis migrer :
```bash
npx prisma migrate dev --name add_product_fields
```

## 🐛 Dépannage

### ❌ Erreur : "Modèle existe déjà"
```
⚠ Modèle product existe déjà dans le schéma Prisma
```
**Solution :** Utiliser un autre nom de ressource ou supprimer manuellement le modèle

### ❌ Erreur : "Port 3000 déjà utilisé"
```bash
# Vérifier les ports utilisés
netstat -ano | findstr :3000

# Utiliser un autre port
PORT=3001 npm start
```

### ❌ Erreur : "Base de données non connectée"
```bash
# Vérifier la connexion Prisma
npx prisma db push

# Réinitialiser (attention: perte de données)
npx prisma migrate reset
```

### ❌ Contrôleur/Routes non trouvés
```bash
# Vérifier l'importation dans src/routes/routes.js
cat src/routes/routes.js | grep ProductController

# Redémarrer le serveur
npm start
```

## 💡 Bonnes pratiques

1. **Nommer les ressources au singulier** : `product` (pas `products`)
2. **Utiliser des noms simples** : Pas d'espaces, pas de caractères spéciaux
3. **Vérifier la migration** : Avant de redémarrer, vérifier `prisma/migrations/`
4. **Tester avec l'interface** : Plus rapide que Postman/cURL
5. **Personaliser après** : LRAD génère la base, à vous de l'adapter

## 📊 Exemple complet : Générer une ressource Article

```bash
$ node lrad.js

📝 Nom de la ressource: article

# LRAD crée automatiquement :
# ✓ src/controllers/ArticleController.js
# ✓ src/routes/articleRoutes.js
# ✓ public/article.html
# ✓ prisma/schema.prisma (model article ajouté)
# ✓ prisma/migrations/.../ (nouvelle migration)
```

**Maintenant tester :**
```bash
npm start

# Puis ouvrir dans le navigateur
http://localhost:3000/article.html
```

## 🎓 Cas d'usage

✅ Prototypage rapide d'API  
✅ Scaffolding MVC automatisé  
✅ Apprentissage de Node.js + Express + Prisma  
✅ Génération de CRUD complets  
✅ Documentation Swagger intégrée  

## 📝 Notes de version

**v1.0** (16 Jan 2026)
- ✅ Génération Contrôleur + Routes + Modèle
- ✅ Migrations Prisma automatiques
- ✅ Interface HTML de test
- ✅ Intégration automatique des routes
- ✅ Swagger documenté

---

## ❓ Questions fréquentes

**Q: Puis-je modifier un contrôleur généré?**  
R: Oui, LRAD crée juste une base. Vous pouvez le modifier librement.

**Q: Comment ajouter des validations?**  
R: Dans le contrôleur, avant `prisma.create()`, ajouter votre logique.

**Q: Puis-je utiliser avec une autre BD que PostgreSQL?**  
R: Oui, Prisma supporte MySQL, SQLite, etc. Configurer dans `.env`

**Q: L'interface HTML fonctionne sans Postman?**  
R: Oui, c'est l'avantage! Interface web intégrée et prête à l'emploi.

**Q: Que faire si la migration échoue?**  
R: Exécuter manuellement : `npx prisma migrate dev`

---

**Besoin d'aide?** Consulter la structure du projet ou lancer `node lrad.js --help`

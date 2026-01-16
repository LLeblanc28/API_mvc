#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Couleurs pour le terminal
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m'
};

// Fonction pour poser une question
const question = (query) => new Promise(resolve => rl.question(query, resolve));

// Exécuter une commande shell
const runCommand = (command) => new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(stdout);
    });
});

// Capitaliser la première lettre
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Convertir en camelCase
const toCamelCase = (str) => {
    return str.replace(/^[a-z]/, c => c.toUpperCase());
};

// Générer le contrôleur
const generateController = (name) => {
    const controllerName = toCamelCase(name);
    const modelName = controllerName;
    const tableName = name.toLowerCase();

    return `import { prisma } from '../../prisma.config.ts';

class ${controllerName}Controller {
    // Récupérer tous les ${name}
    static async index(req, res) {
        try {
            const data = await prisma.${tableName}.findMany();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Récupérer un ${name} par ID
    static async show(req, res) {
        try {
            const data = await prisma.${tableName}.findUnique({
                where: { id: parseInt(req.params.id) }
            });
            res.json(data || { error: 'Non trouvé' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Créer un nouveau ${name}
    static async create(req, res) {
        try {
            const data = await prisma.${tableName}.create({
                data: req.body
            });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Mettre à jour un ${name}
    static async update(req, res) {
        try {
            const data = await prisma.${tableName}.update({
                where: { id: parseInt(req.params.id) },
                data: req.body
            });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Supprimer un ${name}
    static async destroy(req, res) {
        try {
            await prisma.${tableName}.delete({
                where: { id: parseInt(req.params.id) }
            });
            res.json({ success: true, message: '${name} supprimé' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default ${controllerName}Controller;
`;
};

// Générer les routes
const generateRoutes = (name) => {
    const controllerName = toCamelCase(name);
    const tableName = name.toLowerCase();
    const pluralName = tableName + 's';

    return `import ${controllerName}Controller from '../controllers/${controllerName}Controller.js';

const API_PREFIX = '/api/' + (process.env.API_VERSION || 'v1');

/**
 * @swagger
 * /api/v1/${pluralName}:
 *   get:
 *     summary: Récupérer tous les ${pluralName}
 *     tags:
 *       - ${capitalize(pluralName)}
 *     responses:
 *       200:
 *         description: Liste des ${pluralName} récupérée avec succès
 */
router.get(\`\${API_PREFIX}/${pluralName}\`, ${controllerName}Controller.index);

/**
 * @swagger
 * /api/v1/${pluralName}/{id}:
 *   get:
 *     summary: Récupérer un ${name}
 *     tags:
 *       - ${capitalize(pluralName)}
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.get(\`\${API_PREFIX}/${pluralName}/:id\`, ${controllerName}Controller.show);

/**
 * @swagger
 * /api/v1/${pluralName}:
 *   post:
 *     summary: Créer un nouveau ${name}
 *     tags:
 *       - ${capitalize(pluralName)}
 */
router.post(\`\${API_PREFIX}/${pluralName}\`, ${controllerName}Controller.create);

/**
 * @swagger
 * /api/v1/${pluralName}/{id}:
 *   put:
 *     summary: Mettre à jour un ${name}
 *     tags:
 *       - ${capitalize(pluralName)}
 */
router.put(\`\${API_PREFIX}/${pluralName}/:id\`, ${controllerName}Controller.update);

/**
 * @swagger
 * /api/v1/${pluralName}/{id}:
 *   delete:
 *     summary: Supprimer un ${name}
 *     tags:
 *       - ${capitalize(pluralName)}
 */
router.delete(\`\${API_PREFIX}/${pluralName}/:id\`, ${controllerName}Controller.destroy);
`;
};

// Générer le modèle Prisma
const generatePrismaModel = (name) => {
    const tableName = name.toLowerCase();
    
    return `\nmodel ${tableName} {
  id        Int      @id @unique(map: "id_UNIQUE") @default(autoincrement())
  name      String   @db.VarChar(255)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`;
};

// Générer le HTML de test
const generateTestHTML = (name) => {
    const tableName = name.toLowerCase();
    const pluralName = tableName + 's';
    const displayName = capitalize(name);

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API REST - Test ${displayName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1, h2 {
            color: #333;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
        }
        button:hover {
            background-color: #0056b3;
        }
        input {
            padding: 8px;
            margin: 5px 0;
            margin-right: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 200px;
        }
        pre {
            background-color: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        hr {
            border: none;
            border-top: 2px solid #ddd;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>🧪 Interface de Test API REST - ${displayName}</h1>
    
    <hr>
    
    <h2>📋 Liste des ${capitalize(pluralName)}</h2>
    <button onclick="getAll()">GET /api/v1/${pluralName}</button>
    
    <hr>
    
    <h2>🔍 Détail d'un ${displayName}</h2>
    <input type="number" id="detailId" placeholder="ID ${displayName}" value="1">
    <button onclick="getById()">GET /api/v1/${pluralName}/:id</button>
    
    <hr>
    
    <h2>➕ Créer un ${displayName}</h2>
    <input type="text" id="createName" placeholder="Nom" value="${displayName} 1">
    <button onclick="create()">POST /api/v1/${pluralName}</button>
    
    <hr>
    
    <h2>✏️ Mettre à Jour un ${displayName}</h2>
    <input type="number" id="updateId" placeholder="ID" value="1">
    <input type="text" id="updateName" placeholder="Nouveau nom" value="${displayName} Updated">
    <button onclick="update()">PUT /api/v1/${pluralName}/:id</button>
    
    <hr>
    
    <h2>🗑️ Supprimer un ${displayName}</h2>
    <input type="number" id="deleteId" placeholder="ID" value="2">
    <button onclick="delete_()">DELETE /api/v1/${pluralName}/:id</button>
    
    <hr>
    
    <h2>📤 Résultat</h2>
    <pre id="result">Les résultats s'afficheront ici...</pre>

    <script>
        const API_URL = 'http://localhost:3000/api/v1';
        const RESOURCE = '${pluralName}';

        function displayResult(data) {
            document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        }

        function displayError(error) {
            document.getElementById('result').textContent = 'ERREUR: ' + error.message;
        }

        // GET - Liste tous
        async function getAll() {
            try {
                const response = await fetch(\`\${API_URL}/\${RESOURCE}\`);
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayError(error);
            }
        }

        // GET - Détail par ID
        async function getById() {
            const id = document.getElementById('detailId').value;
            try {
                const response = await fetch(\`\${API_URL}/\${RESOURCE}/\${id}\`);
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayError(error);
            }
        }

        // POST - Créer
        async function create() {
            const name = document.getElementById('createName').value;
            
            try {
                const response = await fetch(\`\${API_URL}/\${RESOURCE}\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                });
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayError(error);
            }
        }

        // PUT - Mettre à jour
        async function update() {
            const id = document.getElementById('updateId').value;
            const name = document.getElementById('updateName').value;
            
            try {
                const response = await fetch(\`\${API_URL}/\${RESOURCE}/\${id}\`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                });
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayError(error);
            }
        }

        // DELETE - Supprimer
        async function delete_() {
            const id = document.getElementById('deleteId').value;
            
            try {
                const response = await fetch(\`\${API_URL}/\${RESOURCE}/\${id}\`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayError(error);
            }
        }
    </script>
</body>
</html>`;
};

// Créer le contrôleur
const createController = async (name) => {
    const controllerPath = path.join(__dirname, 'src/controllers', `${toCamelCase(name)}Controller.js`);
    const content = generateController(name);
    
    fs.writeFileSync(controllerPath, content);
    console.log(`${colors.green}✓ Contrôleur créé: ${controllerPath}${colors.reset}`);
    return controllerPath;
};

// Créer les routes
const createRoutes = async (name) => {
    const routesPath = path.join(__dirname, 'src/routes', `${name.toLowerCase()}Routes.js`);
    const content = `import express from 'express';\n${generateRoutes(name)}`;
    
    fs.writeFileSync(routesPath, content);
    console.log(`${colors.green}✓ Routes créées: ${routesPath}${colors.reset}`);
    return routesPath;
};

// Créer le modèle Prisma
const addPrismaModel = async (name) => {
    const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    
    const tableName = name.toLowerCase();
    
    // Vérifier si le modèle existe déjà
    if (schema.includes(`model ${tableName}`)) {
        console.log(`${colors.yellow}⚠ Modèle ${tableName} existe déjà dans le schéma Prisma${colors.reset}`);
        return;
    }
    
    // Ajouter le modèle à la fin du schéma
    const newModel = generatePrismaModel(name);
    const updatedSchema = schema + '\n' + newModel;
    
    fs.writeFileSync(schemaPath, updatedSchema);
    console.log(`${colors.green}✓ Modèle Prisma ajouté: ${tableName}${colors.reset}`);
    
    // Générer le client Prisma
    console.log(`${colors.blue}⏳ Génération du client Prisma...${colors.reset}`);
    try {
        await runCommand('npx prisma generate');
        console.log(`${colors.green}✓ Client Prisma généré${colors.reset}`);
    } catch (error) {
        console.log(`${colors.red}✗ Erreur lors de la génération: ${error.message}${colors.reset}`);
    }
    
    // Créer et appliquer la migration
    console.log(`${colors.blue}⏳ Création de la migration...${colors.reset}`);
    try {
        await runCommand(`npx prisma migrate dev --name create_${tableName}_table --skip-generate`);
        console.log(`${colors.green}✓ Migration créée et appliquée${colors.reset}`);
    } catch (error) {
        console.log(`${colors.yellow}⚠ Migration manuelle requise: npx prisma migrate dev${colors.reset}`);
    }
};

// Créer le fichier HTML de test
const createTestHTML = async (name) => {
    const tableName = name.toLowerCase();
    const htmlPath = path.join(__dirname, 'public', `${tableName}.html`);
    const content = generateTestHTML(name);
    
    fs.writeFileSync(htmlPath, content);
    console.log(`${colors.green}✓ Interface de test créée: ${htmlPath}${colors.reset}`);
    return htmlPath;
};

// Intégrer les routes au fichier principal
const integrateRoutes = async (name) => {
    const routesFile = path.join(__dirname, 'src/routes/routes.js');
    let content = fs.readFileSync(routesFile, 'utf-8');
    
    const controllerName = toCamelCase(name);
    const tableName = name.toLowerCase();
    const pluralName = tableName + 's';
    
    // Ajouter l'import si absent
    const importStatement = `import ${controllerName}Controller from '../controllers/${controllerName}Controller.js';`;
    if (!content.includes(importStatement)) {
        const importIndex = content.indexOf("import RoleController") !== -1 
            ? content.indexOf("import RoleController") 
            : content.indexOf("import UserControllerV1");
        if (importIndex !== -1) {
            const endOfLine = content.indexOf('\n', importIndex);
            content = content.slice(0, endOfLine) + `\nimport ${controllerName}Controller from '../controllers/${controllerName}Controller.js';` + content.slice(endOfLine);
        }
    }
    
    // Ajouter les routes si absentes
    const routePattern = `API_PREFIX}/${pluralName}`;
    if (!content.includes(routePattern)) {
        const routesBlock = 
`
// API – ${capitalize(pluralName)}
/**
 * @swagger
 * /api/v1/${pluralName}:
 *   get:
 *     summary: Récupérer tous les ${pluralName}
 *     tags:
 *       - ${capitalize(pluralName)}
 *     responses:
 *       200:
 *         description: Liste des ${pluralName} récupérée avec succès
 */
router.get(\`\${API_PREFIX}/${pluralName}\`, ${controllerName}Controller.index);
router.get(\`\${API_PREFIX}/${pluralName}/:id\`, ${controllerName}Controller.show);
router.post(\`\${API_PREFIX}/${pluralName}\`, ${controllerName}Controller.create);
router.put(\`\${API_PREFIX}/${pluralName}/:id\`, ${controllerName}Controller.update);
router.delete(\`\${API_PREFIX}/${pluralName}/:id\`, ${controllerName}Controller.destroy);`;
        
        const exportIndex = content.lastIndexOf('export default router;');
        if (exportIndex !== -1) {
            content = content.slice(0, exportIndex) + routesBlock + '\n\n' + content.slice(exportIndex);
        }
    }
    
    fs.writeFileSync(routesFile, content);
    console.log(`${colors.green}✓ Routes intégrées au fichier principal${colors.reset}`);
};

// Fonction principale
const main = async () => {
    console.log(`${colors.blue}
╔════════════════════════════════════════╗
║    RAD - Rapid Application Developer   ║
║   Générateur de ressources MVC-Prisma  ║
╚════════════════════════════════════════╝
${colors.reset}`);

    const resourceName = await question(`${colors.yellow}📝 Nom de la ressource (ex: product, post, category): ${colors.reset}`);
    
    if (!resourceName.trim()) {
        console.log(`${colors.red}✗ Le nom ne peut pas être vide${colors.reset}`);
        rl.close();
        return;
    }

    try {
        console.log(`\n${colors.blue}Génération des fichiers...${colors.reset}\n`);
        
        // Créer le contrôleur
        await createController(resourceName);
        
        // Créer les routes
        await createRoutes(resourceName);
        
        // Créer le fichier HTML de test
        await createTestHTML(resourceName);
        
        // Ajouter le modèle Prisma
        await addPrismaModel(resourceName);
        
        // Intégrer les routes
        await integrateRoutes(resourceName);

        console.log(`
${colors.green}════════════════════════════════════════${colors.reset}
${colors.green}✓ Ressource créée avec succès!${colors.reset}
${colors.green}════════════════════════════════════════${colors.reset}

${colors.yellow}✅ Tout est automatique!${colors.reset}
  • Contrôleur créé et fonctionnel
  • Routes intégrées dans src/routes/routes.js
  • Modèle Prisma ajouté et migré
  • Interface de test générée
  • Client Prisma régénéré

${colors.yellow}Prochaines étapes:${colors.reset}
1. Redémarrer le serveur: npm start
2. Tester l'interface: http://localhost:3000/${toCamelCase(resourceName).toLowerCase()}.html
3. Ou tester avec Postman: GET http://localhost:3000/api/v1/${toCamelCase(resourceName).toLowerCase()}s

${colors.blue}Fichiers créés/modifiés:${colors.reset}
  • src/controllers/${toCamelCase(resourceName)}Controller.js
  • public/${resourceName.toLowerCase()}.html (interface de test)
  • prisma/schema.prisma (nouveau modèle ${resourceName.toLowerCase()})
  • src/routes/routes.js (routes intégrées)
  • prisma/migrations/ (nouvelle migration appliquée)
`);

    } catch (error) {
        console.log(`${colors.red}✗ Erreur: ${error.message}${colors.reset}`);
    }

    rl.close();
};

main();

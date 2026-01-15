import swaggerJsDoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST - Users Management',
            version: '1.0.0',
            description: 'API documentation pour la gestion des utilisateurs',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur local',
            },
            {
                url: process.env.API_URL || 'http://localhost:3000',
                description: 'Serveur de production',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['id', 'name', 'email'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID unique de l\'utilisateur',
                        },
                        name: {
                            type: 'string',
                            description: 'Nom de l\'utilisateur',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email de l\'utilisateur',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création',
                        },
                    },
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nom de l\'utilisateur',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email de l\'utilisateur',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Message d\'erreur',
                        },
                        error: {
                            type: 'string',
                            description: 'Détails de l\'erreur',
                        },
                    },
                },
            },
        },
    },
    apis: ['../routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;

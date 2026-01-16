import { prisma } from '../../prisma.config.ts';

class TestController {
    // Récupérer tous les test
    static async index(req, res) {
        try {
            const data = await prisma.test.findMany();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Récupérer un test par ID
    static async show(req, res) {
        try {
            const data = await prisma.test.findUnique({
                where: { id: parseInt(req.params.id) }
            });
            res.json(data || { error: 'Non trouvé' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Créer un nouveau test
    static async create(req, res) {
        try {
            const data = await prisma.test.create({
                data: req.body
            });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Mettre à jour un test
    static async update(req, res) {
        try {
            const data = await prisma.test.update({
                where: { id: parseInt(req.params.id) },
                data: req.body
            });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Supprimer un test
    static async destroy(req, res) {
        try {
            await prisma.test.delete({
                where: { id: parseInt(req.params.id) }
            });
            res.json({ success: true, message: 'test supprimé' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default TestController;

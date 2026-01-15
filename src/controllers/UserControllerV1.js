import { prisma } from '../../prisma.config.ts';

// const User = require('../models/User');

class UserController {
    static async index(req, res) {
        await prisma.users.findMany().then(users => {
            res.json(users);
        });
    }


    static async show(req, res) {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.json(user || { error: 'Non trouvé' });
    }

    static async new(req, res) {
        const newUser = await prisma.users.create({
            data: req.body
        });
        res.json(newUser);
    }

    static async update(req, res) {
        const updatedUser = await prisma.users.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });
        res.json(updatedUser);
    }

    static async destroy(req, res) {
        await prisma.users.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.json({ ok: true });
    }
}

export default UserController;
// module.exports = UserController;
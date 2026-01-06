const User = require('../models/User');

class UserController {
    static index(req, res) {
        res.json(User.getAll());
    }

    static show(req, res) {
        const user = User.getById(req.params.id);
        res.json(user || { error: 'Non trouvé' });
    }

    static new(req, res) {
        res.status(201).json(User.create(req.body));
    }

    static update(req, res) {
        res.json(User.update(req.params.id, req.body));
    }

    static destroy(req, res) {
        User.delete(req.params.id);
        res.json({ ok: true });
    }
}

module.exports = UserController;
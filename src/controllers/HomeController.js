class HomeController {
    static index(req, res) {
        res.sendFile('index.html', { root: 'public' });
    }
}

module.exports = HomeController;
